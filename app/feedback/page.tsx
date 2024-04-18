import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import { prisma } from "@/lib/db"
import { useState } from "react";
import { FeedbackType } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const page = async() => {

    return(
        <>
             <MaxWidthWrapper className="mt-12">
                <div className="space-y-6">
                    <h3 className="text-md text-slate-600">Give us feedback!</h3>
                    <h2 className="text-2xl font-medium">Hvor fornøyd er du generelt med tjenestene som ble levert av vår bedrift?</h2>

                    <div className="flex flex-row space-x-10">
                        {Object.values(FeedbackType).map((type, index) => (
                            <Card key={index} className="p-8 flex flex-col items-center justify-center bg-slate-100">
                                <CardContent className="flex flex-col items-center justify-center space-y-4">
                                    <div className="text-center text-5xl">
                                        {type === 'VERYBAD' && '😞'}
                                        {type === 'BAD' && '😕'}
                                        {type === 'NEUTRAL' && '😐'}
                                        {type === 'GOOD' && '😊'}
                                        {type === 'VERYGOOD' && '😄'}
                                    </div>
                                    <div className="text-center font-bold text-2xl">
                                        {type === 'VERYBAD' && 'Very Bad'}
                                        {type === 'BAD' && 'Bad'}
                                        {type === 'NEUTRAL' && 'Neutral'}
                                        {type === 'GOOD' && 'Good'}
                                        {type === 'VERYGOOD' && 'Very Good'}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="space-y-6 mt-10">
                        <h2 className="text-2xl font-medium">Leave Your Feedback</h2>
                        <div>
                            <Textarea className="resize-none h-40" placeholder="Enter Your Message Here"/>
                        </div>
                    </div>

                    <Button type="submit">Send inn tilbakemeling</Button>
                    
                </div>
             </MaxWidthWrapper>
            </>
    )
}

export default page;