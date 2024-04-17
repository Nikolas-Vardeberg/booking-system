
'use client';

import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"
import { prisma } from "@/lib/db"
import { handleDelete } from "@/lib/getServerSideProps";
import { useRouter } from 'next/navigation';
import { useState } from "react";


const DeleteButton = ( itemId: any ) => {
    const router = useRouter();

    const handleClick = () => {
        handleDelete(itemId);
        router.refresh();
    };

    return(
        <>
            <Button size='sm' className='w-full' variant='destructive' onClick={handleClick}>
                <Trash className='h-4 w-4' />
            </Button>
        </>
    )
}

export default DeleteButton