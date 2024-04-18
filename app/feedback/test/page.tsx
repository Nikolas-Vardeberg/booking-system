"use client"

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";



const page = () => {


    const handleClick = () => {
        toast.success("hei")
    }

    return(
        <Button onClick={handleClick}>Click for toast</Button>
    )
}

export default page;