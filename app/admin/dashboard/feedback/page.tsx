import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Ghost, MessageSquare, Plus, SlashIcon } from "lucide-react"
import { prisma } from "@/lib/db"
import { format } from "date-fns";
import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import FeedbackFilter from "@/components/FeedbackFilterToggleGroup";

const page = async() => {
    const feedback = await prisma.feedback.findMany({})

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
              <Card className="mt-10">
                <CardHeader>
                  Total review, Average review, bra tilbakemeling 
                </CardHeader>
              </Card>

              <FeedbackFilter />

        {feedback && feedback.length !== 0 ? (
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl">{item.feedback}</h3>
                <p className="text-gray-600"> {item.comment.length ? item.comment : "No comment"}</p>
                <p className="text-gray-500">{format(new Date(item.createdAt), 'MMM d, HH:mm')}</p>

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
            No feedback has been left.
            </p>
          </div>
        )}
      </div>
        </MaxWidthWrapper>
    )
}

export default page;