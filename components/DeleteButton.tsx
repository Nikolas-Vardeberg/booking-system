"use client"

import { Button } from "@/components/ui/button";
import { handleDelete } from "@/lib/getServerSideProps";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from 'next/router'; // Corrected import
import { useState } from "react";

const DeleteButton = ({ itemId }) => { // Corrected prop usage

    const handleClick = async () => {
        try {
            const success = await handleDelete(itemId);
            if (success) {
                window.location.reload(); // Refresh the current page
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            // Handle the error, e.g., show a message to the user
        }
    };
    return (
        <Button size='sm' className='w-full' variant='destructive' onClick={handleClick}>
            <Trash className='h-4 w-4' />
        </Button>
    );
}

export default DeleteButton;