"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import { prisma } from "@/lib/db"
import { useEffect, useState } from "react";
import { FeedbackType } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createFeedback } from "@/lib/getServerSideProps";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';


const page = () => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [comment, setComment] = useState("");
    const feedbackSubmitted = Cookies.get('feedbackSubmitted');

    const handleFeedbackClick = (type) => {
        setSelectedFeedback(type);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Check if feedback has already been submitted
        if (Cookies.get('feedbackSubmitted')) {
            toast("You have already sent feedback.");
            return; // Exit the function if feedback has already been submitted
        }
    
        if (selectedFeedback === null) {
            toast("Please select a feedback type before submitting.");
            return; // Exit the function if no feedback type is selected
        }
    
        try {
            const feedback = await createFeedback(selectedFeedback, comment);
            toast.success("Feedback submitted successfully");
            // Set a cookie indicating that feedback has been submitted
            Cookies.set('feedbackSubmitted', 'true', { expires: 365 }); // Cookie expires in 365 days
            // Optionally, clear the form or show a success message
            setSelectedFeedback(null);
            setComment("");
        } catch (error) {
            toast.error("Error submitting feedback: " );
            // Optionally, show an error message
        }
    };
    

    return(
        <>
             <MaxWidthWrapper className="mt-12 transition-all">
            {feedbackSubmitted ? (
                <div className="text-center text-2xl font-bold mb-4">
                   Thank you for the feedback!
                </div>
            ) : (
                <div className="space-y-6">
                <h3 className="text-md text-slate-600">Give us feedback!</h3>
                <h2 className="text-2xl font-medium">Hvor fornøyd er du generelt med tjenestene som ble levert av vår bedrift?</h2>
            
                {/* Responsive grid container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.values(FeedbackType).map((type, index) => (
                        <Card key={index} 
                            className={`p-8 flex flex-col items-center justify-center bg-slate-100 transition-all ${selectedFeedback === type ? 'border-black border-2 bg-white' : ''}`}
                            onClick={() => handleFeedbackClick(type)}
                        >
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
                        <Textarea className="resize-none h-40" placeholder="Enter Your Message Here" value={comment} onChange={handleCommentChange}/>
                    </div>
                </div>

            
                <Button type="submit" onClick={handleSubmit} disabled={selectedFeedback === null}>Send inn tilbakemeling</Button>

            </div>
            )}
        </MaxWidthWrapper>
            </>
    )
}

export default page;