"use server"

import { prisma } from "@/lib/db"
import { FeedbackType } from "@prisma/client";

export const handleDelete = async ({itemId}: any) => {
    await prisma.service.delete({
        where: {
            id: itemId,
        },
    });
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