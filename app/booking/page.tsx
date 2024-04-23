"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { OPENING_HOURS_INTERVAL, now } from "@/constants/config"
import { Day } from "@prisma/client"
import { format, formatISO, isBefore, parse, roundToNearestMinutes } from "date-fns"
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from "react"
import { Calendar} from "react-calendar"
import 'react-calendar/dist/Calendar.css';



interface CalendarProps {
    days: Day[] // as ISO strings
    closedDays: string[] // as ISO strings
  }

  const page: FC<CalendarProps> = ({ days = [], closedDays }) => {

    return(
        <MaxWidthWrapper>
          <div>
            booking
          </div>
        </MaxWidthWrapper>
    )
}

export default page