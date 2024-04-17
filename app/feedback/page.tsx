import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";



const page = () => {
    return(
        <>
             <MaxWidthWrapper className="">
                <div className="space-y-6">
                    <h3 className="text-md text-slate-600">Question 1</h3>
                    <h1 className="text-2xl font-medium">Were you able to follow instruction</h1>
                    
                    {/* list of enum */}
                    <div>

                    </div>
                </div>
            </MaxWidthWrapper>
        </>
    )
}

export default page;