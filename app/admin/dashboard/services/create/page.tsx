"use client"

import { Button } from "@/components/ui/button";
import { createService } from "@/lib/getServerSideProps";
import { useState } from "react";

const page = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imageKey, setImageKey] = useState(""); // New state variable for imageKey

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            const floatPrice = parseFloat(price);
            if (isNaN(floatPrice)) {
                throw new Error('Price must be a valid number');
            }

            const service = await createService({ name, price: floatPrice, imageKey });
            return service;
        } catch (error) {
            console.error('Error creating service:', error);
        }
    }

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
          <label>
            Image Key:
            <input type="text" value={imageKey} onChange={(e) => setImageKey(e.target.value)} />
          </label>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
}

export default page;