import prisma from "../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest , params: { id: string }) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("id");
  const transactions = await prisma.transaction.findMany({
    where: {
      customerId: parseInt(customerId),
    },
    
  });
  return NextResponse.json(transactions);

}   

export async function POST(request: NextRequest , params: { id: string }) {
  const body = await request.json();
  const { date, debit, credit, balance, customerId } = body.newTransaction;

  let updatedDate = date;

  if(updatedDate === ''){
    updatedDate = new Date().toISOString().split('T')[0]; // Default to today's date if not provided
  }

  let total = credit - debit;

  const totalcredit = await prisma.transaction.aggregate({
    _sum: {
      credit: true,
    },
    where: {
      customerId: parseInt(customerId),
    },
  });

  const totaldebit = await prisma.transaction.aggregate({
    _sum: {
      debit: true,
    },
    where: {
      customerId: parseInt(customerId),
    },
  });

    if (totalcredit._sum.credit === null) {
        totalcredit._sum.credit = 0;
    }

    if (totaldebit._sum.debit === null) {
        totaldebit._sum.debit = 0;
    }

    total = total + totalcredit._sum.credit - totaldebit._sum.debit;


    try {
    const updatedUser = await prisma.customer.update({
       where: {
        id: parseInt(customerId),
      },
      data: {
        balance: total, // Update the customer's balance
      },
    });

    console.log('User updated successfully:', updatedUser);
  } catch (error) {
    if (error.code === 'P2025') {
      console.error(`Error: User with ID ${userIdToUpdate} not found.`);
    } else {
      console.error('Error updating user:', error);
    }
  }




  
  const newTransaction = await prisma.transaction.create({
    data: {
      date: new Date(updatedDate),
      debit: parseFloat(debit),
      credit: parseFloat(credit),
      totalBalance: total, // Ensure totalBalance is a number
      customerId: parseInt(customerId),
    },
  });
  
  return NextResponse.json(newTransaction);
}