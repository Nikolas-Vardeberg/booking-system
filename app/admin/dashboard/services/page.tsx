"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Ghost, Loader2, MessageSquare, Plus, SlashIcon, Trash } from "lucide-react"

import { prisma } from "@/lib/db"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { format } from "date-fns"
import { Button, buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import DeleteButton from "@/components/DeleteButton"
import { useEffect, useState } from "react"
import { fetchServices } from "@/lib/getServerSideProps"
import { Service } from "@prisma/client"

const page = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to track loading status

    useEffect(() => {
        const loadServices = async () => {
            setIsLoading(true); // Set loading to true before fetching
            const fetchedServices = await fetchServices();
            setServices(fetchedServices);
            setIsLoading(false); // Set loading to false after fetching
        };

        loadServices();
    }, []);


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

            <div className="mt-8 flex flex-col items-start justify-between gap-4  pb-5 sm:flex-row sm:gap-0 border-b">
                    <h1 className="mb-3 font-bold text-3xl text-gray-900">My Services</h1>

                    <Link className={buttonVariants({ variant: "outline",  size: "default", className: "max-md:hidden" })}
                        href="/admin/dashboard/services/create"
                    >
                        Lag ny service <Plus className="ml-2 h-5 w-5" />
                    </Link>
                </div>


                {isLoading ? (
                    <div className="mt-16 flex flex-col items-center gap-2">
                        <Loader2 className="animate-spin"/>
                        <h3 className="font-semibold text-xl">
                            Loading services...
                        </h3>
                    </div>
                ) : (
                    services && services.length !== 0 ? (
                        <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((service) => (
                                <div key={service.id} className="col-span-1 rounded-lg divide-y bg-white transtion border">
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

                                        <DeleteButton itemId={service.id} />
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    )
                )}


           


        </MaxWidthWrapper>
    )
}


export default page