import React from 'react';
import './customerCard.css'; 



export default function CustomersCard(props: any) {
  return (
    <div className="customer-card" onClick={() => props.onClick(props.id)}>
      <h1>Customer ID: {props.id}</h1>
      <h1>Name: {props.name}</h1>
      <h1>Contact No: {props.contact_no}</h1>
      <h1>Address: {props.address}</h1>
      <h1>Balance: {props.balance}</h1>
    </div>
  );
}