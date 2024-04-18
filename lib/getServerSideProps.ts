"use server"

import { prisma } from "@/lib/db"

export const handleDelete = async ({itemId}: any) => {
    await prisma.service.delete({
        where: {
            id: itemId,
        },
    });
};


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