import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { prisma } from '@/lib/db';
import { Ghost } from 'lucide-react';
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
                her kan de kunne gjøre endringer til servicen
        
                <h1>{serviceid}</h1>
                <h1>{getServiceInfo?.name}</h1>

            </MaxWidthWrapper>
        </>
    );
}

export default page;
