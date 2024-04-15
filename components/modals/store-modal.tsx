"use client"

import { MAX_FILE_SIZE } from "@/constants/config"
import { ChangeEvent, useEffect, useState } from "react"
import MaxWidthWrapper from "../MaxWidthWrapper"
import Image from "next/image"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { nanoid } from "nanoid"
import { s3 } from "@/lib/s3"
import { prisma } from "@/lib/db"


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

export const StoreModal = () => {
    const [input, setInput] = useState<Input>(initialInput)
    const [preview, setPreview] = useState<string>('')
    const [error, setError] = useState<string>('')

    const createPresignedUrl = async({ fileType }) => {
        const id = nanoid()
        const ex = input.fileType.split("/")[1]
        const key = `${id}.${ex}`

        const {url, fields} = await new Promise((resolve, reject) => {
            s3.createPresignedPost({
                Bucket: "service-creation",
                Fields: { key },
                Expires: 60,
                Conditions: [
                    ["content-length-range", 0, MAX_FILE_SIZE],
                    ["starts-with", "$Content-Type", "image/"],
                ],
            },
            

            (err, data) => {
                if (err) return reject(err)
                resolve(data)
            }

            )
        }) as any as { url: string; fields: any }

        return { url, fields, key }
    }

    useEffect(() => {
        //CREATE PREVIEW
        if (!input.file) return
        const objectUrl = URL.createObjectURL(input.file)
        setPreview(objectUrl)

        //ClEAN UP THE PREVIEW
        return () => URL.revokeObjectURL(objectUrl)
    }, [input.file])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return setError("no file selected")
        if (e.target.files[0].size > MAX_FILE_SIZE) return setError("File size is to big")
        setInput((prev) => ({...prev, file: e.target.files![0]}))
    }

    const handleImageUpload = async() => {
        const { file } = input
        if (!file) return

        const {fields, key, url } = await createPresignedUrl({fileType: file.type })

        const data = {
            ...fields,
            "Content-type": file.type,
            file
        }

        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value as any)
        })

        await fetch(url, {
            method: "POST",
            body: formData
        })

        return key

    }

    const addMenuItem = async({ input }) => {
        const key = await handleImageUpload()
        if (!key) throw new Error("no key")


        const { imageKey, name, price } = input
        const service = await prisma.service.create({
          data: {
                imageKey,
                name,
                price,
              },
            })

            return service;
    }

     const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: value }))
  }

    return(
        <MaxWidthWrapper className="mt-20">
            <div className='mx-auto flex max-w-xl flex-col gap-2'>
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
                className='relative h-12 cursor-pointer rounded-sm font-medium focus-within:outline-none'>
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
                className='h-12 rounded-sm disabled:cursor-not-allowed'
                disabled={!input.file || !input.name}
                onClick={addMenuItem}>
                Add menu item
            </Button>
            </div>
        </MaxWidthWrapper>
    )
}

