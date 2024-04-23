"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createImageData, createService } from "@/lib/getServerSideProps";
import { s3 } from "@/lib/s3";
import { SlashIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";


const page = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [interval, setInterval] = useState("");


    const [imageKey, setImageKey] = useState(""); // New state variable for imageKey
    const [imageUrl, setImageUrl] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        try {
            const floatPrice = parseFloat(price);
            if (isNaN(floatPrice)) {
                throw new Error('Price must be a valid number');
            }

            const floatInterval = parseFloat(interval);
            if (isNaN(floatInterval)) {
                throw new Error("interval must be a valid number")
            }

            const service = await createService({ name, price: floatPrice, imageKey, interval: floatInterval });
            return service;
        } catch (error) {
            console.error('Error creating service:', error);
        }
    }

    return (
      <MaxWidthWrapper>
      <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard">admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
              <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
              <BreadcrumbLink href="/admin/dashboard/services">Service</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
              <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
          </BreadcrumbList>
      </Breadcrumb>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-12">
          <Label>Name of service</Label>
          <Input type="text" placeholder="name of service" value={name} onChange={(e) => setName(e.target.value)} />
          
          <Label>Price</Label>
          <Input type="number" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} />

          <Label>Interval *in minutes</Label>
          <Input type="number" placeholder="interval" value={interval} onChange={(e) => setInterval(e.target.value)} />
         
          <Button type="submit">Submit</Button>
        </form>
      </MaxWidthWrapper>
    )
}

export default page;