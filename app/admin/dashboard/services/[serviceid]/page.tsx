import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { prisma } from '@/lib/db';
import { UpdateIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Ghost, Plus, SlashIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect, useRouter } from 'next/navigation';

interface PageProps {
    params: {
        serviceid: string
    }
}

const page = async({ params }: PageProps) => {
    const { serviceid } = params;

    const file = await prisma.service.findFirst({
        where: {
            id: serviceid,
        }
    })

    const getServiceInfo = await prisma.service.findUnique({
        where: {
            id: serviceid,
        }
    })

    if(!file) return(
        <div className="mt-16 flex flex-col items-center gap-2">
            <Ghost className="h-8 w-8 text-gray-900" />
            <h3 className="font-semibold text-xl">
                Couldn't find service 
            </h3>
            <p>
                Sorry, couldn't find the service you're looking for!
            </p>
        </div>
    )

    return (
        <>
            <MaxWidthWrapper>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard/services">Service</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                    <SlashIcon />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                    <BreadcrumbPage>{getServiceInfo?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

                <div className="my-8 flex flex-col items-start justify-between gap-4  pb-5 sm:flex-row sm:gap-0 border-b">
                    <h1 className="mb-3 font-bold text-3xl text-gray-900">{getServiceInfo?.name}</h1>

                    <Link className={buttonVariants({ variant: "outline",  size: "default", className: "max-md:hidden" })}
                        href="/admin/dashboard/services/create"
                    >
                        Oppdater <UpdateIcon className="ml-2 h-5 w-5" />
                    </Link>

                </div>

                <Card>
                    <CardContent className='flex flex-row justify-between p-6'>
                        <h1>{getServiceInfo?.name}</h1>
                        <h1>createdAt: {format(new Date(getServiceInfo?.createdAt), "MMM d yyyy")}</h1>
                        <h1>updatedAt: {format(new Date(getServiceInfo?.updatedAt), "MMM d yyyy")}</h1>
                        <h1>{getServiceInfo?.imageKey}</h1>
                        <h1>price: {getServiceInfo?.price}</h1>
                    </CardContent>
                </Card>

                <Input placeholder={getServiceInfo?.name} className='my-8'/>

                <Input type='number' placeholder={getServiceInfo?.price} className='my-8'/>

                <Button type='submit' className='w-full'>Oppdater</Button>



                {/* image ting orker ikke nå */}
        
            </MaxWidthWrapper>
        </>
    );
}

export default page;
