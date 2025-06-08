import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const customers = await prisma.customer.findMany();
  // console.log("Fetched customers:", customers);
  return NextResponse.json(customers);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {name , contact_no , address , balance} = body.customer;
  const newCustomer = await prisma.customer.create({
    data: {
      name: name,
      contactNo: contact_no,
      address: address,
      balance: parseFloat(balance), 
    },
  });
  console.log("New customer created:", newCustomer);
  return NextResponse.json(newCustomer);
}
   