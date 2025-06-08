"use client";

import Button from '@/app/components/button/Button';
import './page.css'
import React, { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  debit: number;
  credit: number;
  totalBalance: number;
  customerId: number;
}



export default function TransactionPage({ params }: {params:{id: string}}) {
  const { id } = React.use(params);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0, 
    date: '',
    debit: 0,
    credit: 0,
    totalBalance: 0,
    customerId: parseInt(id, 10), 
  });

  const [bio ,setBio] = useState({
    customerid: parseInt(id, 10),
    name: '',
    contact_no: '',
    address: '',
    balance: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === 'date' ? value : parseFloat(value), 
    }));
  };

  const fetchCustomerBio = async () => {
    try {
      const response = await fetch(`/api/bio/?id=${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched customer bio:', data);
      // Assuming the response contains balance, update the state
      setBio({
        customerid: id,
        name: data.name,
        contact_no: data.contactNo,
        address: data.address,
        balance: data.balance,
      });
    } catch (e: any) {
      console.error('Error fetching customer bio:', e);
      setError(e.message || 'Failed to fetch customer bio.');
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newTransaction}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchTransactions(); // Refresh the transaction list after adding a new transaction
      fetchCustomerBio(); // Refresh the customer bio to get the updated balance
        setNewTransaction({
            id: 0,
            date: '',
            debit: 0,
            credit: 0,
            totalBalance: 0,
            customerId: parseInt(id, 10),
        }); 

    } catch (e: any) {
      console.error('Error adding transaction:', e);
      setError(e.message || 'Failed to add transaction.');
    }
  };

    const fetchTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
          // Adjust the API endpoint as needed
          const response = await fetch(`/api/transactions?id=${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          
          setTransactions(data);
        } catch (e: any) {
          console.error('Error fetching transactions:', e);
          setError(e.message || 'Failed to fetch transactions.');
        } finally {
          setLoading(false);
        }
    };

  useEffect(() => {
    if (id) {
        console.log('Fetching transactions for customer ID:', id);
        fetchTransactions();
        fetchCustomerBio(); 
    }
  }, [id]);

  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <div>

        <div className='customer-header'>
          <h1>Customer ID: {bio.customerid}</h1>
          <h1>Customer Name: {bio.name}</h1>
          <h1>Customer Contact No: {bio.contact_no}</h1>
          <h1>Customer Address: {bio.address}</h1>
          <h1>Customer Balance: {bio.balance}</h1>
        </div>

        

        <div className='add-transaction-form'>
          <h2>Add New Transaction</h2>
            <form>
              <input type="date" name="date" onChange={handleChange} />
              <input type="number" name="debit" onChange={handleChange} placeholder="Debit" />
              <input type="number" name="credit" onChange={handleChange} placeholder="Credit"/>
              <Button name="Add Transaction" trigger={handleAddTransaction} />
            </form>
       </div>
    
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.debit}</td>
              <td>{transaction.credit}</td>
              <td>{transaction.totalBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
}