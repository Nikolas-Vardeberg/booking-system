import { prisma } from '@/lib/db';
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

    return (
        <div>
            <h1>{serviceid}</h1>
        </div>
    );
}

export default page;
