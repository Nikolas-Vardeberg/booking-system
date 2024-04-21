"use server"

import { prisma } from "@/lib/db"
import { FeedbackType, Service } from "@prisma/client";
import { redirect } from "next/navigation";

export const handleDelete = async (itemId) => {
    try {
        await prisma.service.delete({
            where: {
                id: itemId,
            },
        });
        console.log("Service deleted successfully");
        return true; // Indicate success
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export const createImageData = async (imageData) => {
    console.log("image data on server", imageData)
}

export const createService = async ({ name, price, imageKey }) => {
    try {
       const service = await prisma.service.create({
         data: {
           name,
           price,
           imageKey,
           active: true, // Assuming you want to set the service as active by default
         },
       });
       console.log("created")

       redirect("/admin/dashboard/services")
   
    } catch (error) {
       console.error('Error creating service:', error);
       throw error;
    }
};

export const fetchServices = async (): Promise<Service[]> => {
    const services = await prisma.service.findMany({});
    return services;
};

export async function createFeedback(feedbackType: FeedbackType, comment: string) {
    try {
       const feedback = await prisma.feedback.create({
         data: {
           feedback: feedbackType, // Corrected property name to match the schema
           comment: comment,
           createdAt: new Date(),
         },
       });
       return feedback;
    } catch (error) {
       console.error("Error creating feedback:", error);
       throw error;
    }
}


export const handleUpdate = async ({itemId}: any) => {
    await prisma.service.update({
        where: {
            id: itemId,
        },
        data: {

        }
    })
}

export async function getServerSideProps() {
    const data = await prisma.service.findMany();


    return {
        props: {
            data,
        },
    };
}