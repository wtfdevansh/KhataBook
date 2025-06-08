"use client";

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import './globals.css';
import CustomersCard from './components/customerscard/customerCard';
import AddCustomerCard from './components/addCustomerCard/addCustomerCard';


interface CustomerData {
  id: number; 
  name: string;
  contactNo: number;
  address: string;
  balance: number;
}


export default function Home(props) {


    const [customersData, setCustomersData] = useState<CustomerData[]>([]);
    const [customer, setCustomer] = useState({
        name: props.name || '',
        contact_no: props.contact_no || '',
        address: props.address || '',
        balance: props.balance || ''
      });

    const router = useRouter();
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
        console.log(value)
      }; 


    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers' , {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CustomerData[] = await response.json();
      console.log('Fetched customers:', data);
      setCustomersData(data);
    } catch (e) {
        console.error('Error fetching customers:', e);
      }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);



  const handleAddCustomer = () => {
  
    console.log('Add Customer button clicked');
    console.log(customer.name)

    

    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer
      }),
    });

    fetchCustomers(); 
  };

  const handleTransactionClick = (id: number) =>{
    console.log(`Transaction clicked for Customer ID: ${id}`);
    router.push(`/transactions/${id}`);
  }

  return (
    <div className='card-wrapper'>
      {customersData.map((customer) => (
        
          <CustomersCard
            key={customer.id}
            id={customer.id}
            name={customer.name}
            contact_no={customer.contactNo}
            address={customer.address}
            balance={customer.balance}
            onClick={handleTransactionClick} 
          />
        ))}
        
        <AddCustomerCard trigger={handleAddCustomer} handlechange={handleChange} customer={customer} />
    </div>
  );
}
