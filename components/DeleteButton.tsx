
'use client';

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { prisma } from "@/lib/db"
import { handleDelete } from "@/lib/getStaticProps";


const DeleteButton = ( itemId: any ) => {


    const handleClick = () => {
        handleDelete(itemId);
        window.location.reload();
    };

    return(
        <>
        <button onClick={handleClick}>
            slett
        </button>
        </>
    )
}

export default DeleteButton