"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { prisma } from "@/lib/db"



const DeleteButton = ({ itemId }) => {

    const handleDelete = async () => {
        console.log(typeof itemId, itemId);

        // Delete the file from the database using Prisma
        await prisma.service.delete({
            where: {
                id: itemId,
            }
        });
    };

    return(
        <>
            <Button size="sm" className="w-full" variant="destructive" onClick={handleDelete}>
                <Trash className="h-4 w-4"/>
            </Button>
        </>
    )
}

export default DeleteButton