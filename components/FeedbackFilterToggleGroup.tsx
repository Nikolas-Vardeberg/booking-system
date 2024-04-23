"use client"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useState } from "react";
   

const FeedbackFilter = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    return(
        <div className="flex flex-row space-x-4 mt-4">
            <ToggleGroup type="single" variant="outline" onValueChange={handleFilterChange}>
                <ToggleGroupItem value="all" aria-label="Toggle all feedback">
                    All Feedback
                </ToggleGroupItem>
                <ToggleGroupItem value="bad" aria-label="Toggle bad feedback">
                    Dårlig Feedback
                </ToggleGroupItem>
                <ToggleGroupItem value="good" aria-label="Toggle good feedback">
                    Bra Feedback
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}

export default FeedbackFilter;