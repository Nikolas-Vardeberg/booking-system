"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming 'shadcnui' is a UI library you're using
import { createService } from '@/lib/getServerSideProps'; // Import the createService function

const ServiceModal = () => {
 const [name, setName] = useState('');
 const [price, setPrice] = useState('');

 const handleSubmit = async () => {
    try {
      const service = await createService({ name, price });
      console.log('Service created:', service);
      // Optionally, clear the form or close the modal here
    } catch (error) {
      console.error('Failed to create service:', error);
    }
 };

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </div>
 );
};

export default ServiceModal;
