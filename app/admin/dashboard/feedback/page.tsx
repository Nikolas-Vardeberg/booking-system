import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Ghost, MessageSquare, Plus, SlashIcon } from "lucide-react"
import { prisma } from "@/lib/db"
import { format } from "date-fns";
import Link from "next/link";

const page = async() => {
    const getAllFeedback = await prisma.feedback.findMany({})

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
                    <BreadcrumbPage>Feedback</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div>
            {getAllFeedback && getAllFeedback?.length !== 0 ? (
                <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getAllFeedback.sort((a, b)  => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((feedback) => (
                        <div key={feedback.id} className="col-span-1 rounded-lg divide-y bg-white transtion border">
                            <Link href={``} className="flex flex-col gap-2 ">
                                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"/>
                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate text-lg font-medium text-zinc-900">
                                                {feedback.comment}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    {format(new Date(feedback.createdAt), "MMM yyyy")}
                                </div>

                                <div className="flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    {feedback.id}
                                </div>


                                </div>
                        </div>
                    ))}
                </div>
            ): (
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
            </div>
        </MaxWidthWrapper>
    )
}

export default page;