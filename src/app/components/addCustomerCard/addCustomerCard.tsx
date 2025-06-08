import './addCustomerCard.css';
import React, { useState } from 'react';
import Button from '../button/Button';

export default function AddCustomerCard(props: any) {

 
  return (
    <div className="add-customer-card">
      <input className="modern-input-layout" type="text" name="name" placeholder="Name" value={props.customer.name} onChange={props.handlechange} />
      <input className="modern-input-layout" type="text" name="contact_no" placeholder="Contact No" value={props.customer.contact_no} onChange={props.handlechange} />
      <input className="modern-input-layout" type="text" name="address" placeholder="Address" value={props.customer.address} onChange={props.handlechange} />
      <input className="modern-input-layout" type="text" name="balance" placeholder="Balance" value={props.customer.balance} onChange={props.handlechange} />
      <Button name="add customer" trigger={props.trigger}/>
    </div>
  );
}