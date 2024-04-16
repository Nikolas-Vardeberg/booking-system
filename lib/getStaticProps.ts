"use server"

import { prisma } from "@/lib/db"

export const handleDelete = async ({itemId}: any) => {
    await prisma.service.delete({
        where: {
            id: itemId,
        },
    });
};

export async function getStaticProps() {
    const data = await prisma.service.findMany();

    return {
        props: {
            data,
        },
    };
}