import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Ghost, MessageSquare, Plus, SlashIcon, Trash } from "lucide-react"

import { prisma } from "@/lib/db"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"



const page = async() => {


    //FINDMANY PRISMA (FINNE ALLE SERVICER)
    const getAllServices = await prisma.menuItem.findMany({})



    //FINDMANY UPDATE
    

    //FINDMANY DELETE

    //FINDMANY CREATE

  //  if(!dbUser) {
    //    await db.user.create({
      //      data: {
        //        id: user.id,
          //      email: user.email
           // }
        //})
     //}



     // få bilde i sirkelen 
     //const objectUrl = URL.createObjectURL(input.file)
     //return () => URL.revokeObjectURL(objectUrl)


    return(
        <MaxWidthWrapper>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbPage>Services</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {getAllServices && getAllServices?.length !== 0 ? (
                    <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                        {getAllServices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((service) => (
                            <li key={service.id} className="col-span-1 divide-y rounded-lg bg-white border transition">
                                <Link href={`/admin/dashboard/services/${service.id}`} className="flex flex-col gap-2 ">
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"/>
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-lg font-medium text-zinc-900">
                                                    {service.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4" />
                                        {format(new Date(service.createdAt), "MMM yyyy")}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        {service.name}
                                    </div>

                                    <Button size="sm" className="w-full" variant="destructive">
                                        <Trash className="h-4 w-4"/>
                                    </Button>
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-16 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-gray-900" />
                    <h3 className="font-semibold text-xl">
                        Pretty empty around here
                    </h3>
                    <p>
                        Let&apos;s create your first Service.
                    </p>
                </div>
                )}

        </MaxWidthWrapper>
    )
}

export default page