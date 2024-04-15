"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { StoreModal } from "@/components/modals/store-modal"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MAX_FILE_SIZE } from "@/constants/config"
import { Ghost, MessageSquare, Plus, SlashIcon, Trash } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import type { MultiValue } from 'react-select/dist/declarations/src'

const DynamicSelect = dynamic(() => import('react-select'), { ssr: false })

interface Input {
    name: string
    price: number
    file: undefined | File
  }
  
  const initialInput = {
    name: '',
    price: 0,
    file: undefined,
  }

const page = async() => {
    const [input, setInput] = useState<Input>(initialInput)
    const [preview, setPreview] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const addMenuItem = async () => {
      
    }

    return(
        <MaxWidthWrapper>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/services">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                <SlashIcon />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                <BreadcrumbPage>Create Service</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <>
          <StoreModal />
        </>

        </MaxWidthWrapper>
    )
}

export default page