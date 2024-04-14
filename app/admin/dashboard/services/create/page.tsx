"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    categories: [],
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

        <div className='mx-auto flex max-w-xl flex-col gap-2 mt-20'>
          <Input
            name='name'
            type='text'
            placeholder='name'
            onChange={handleTextChange}
            value={input.name}
          />

          <Input
            name='price'
            type='number'
            placeholder='price'
            onChange={(e) => setInput((prev) => ({ ...prev, price: Number(e.target.value) }))}
            value={input.price}
          />

          <Label
            htmlFor='file'
            className='relative h-12 cursor-pointer rounded-sm border'>
            <span className='sr-only'>File input</span>
            <div className='flex h-full items-center justify-center'>
              {preview ? (
                <div className='relative h-3/4 w-full'>
                  <Image alt='preview' style={{ objectFit: 'contain' }} fill src={preview} />
                </div>
              ) : (
                <span>Select image</span>
              )}
            </div>
            <Input
              name='file'
              id='file'
              onChange={handleFileSelect}
              accept='image/jpeg image/png image/jpg'
              type='file'
              className='sr-only'
            />
          </Label>

          <Button
            className='disabled:cursor-not-allowed'
            disabled={!input.file || !input.name}
            onClick={addMenuItem}>
            Add menu item
          </Button>
        </div>
        {error && <p className='text-xs text-red-600'>{error}</p>}


        </MaxWidthWrapper>
    )
}

export default page