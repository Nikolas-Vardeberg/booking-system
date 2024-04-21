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
    const router = useRouter()

    const today = days.find((d) => d.dayOfWeek === now.getDay());
    const rounded = roundToNearestMinutes(now, OPENING_HOURS_INTERVAL)
    const closing = parse(today!.closeTime, 'kk:mm', now)
    const tooLate = !isBefore(rounded, closing)
    if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)))

    const [date, setDate] = useState<DateTime>({
        justDate: null,
        dateTime: null,
      })

      useEffect(() => {
        if (date.dateTime) {
          localStorage.setItem('selectedTime', date.dateTime.toISOString())
          router.push('/menu')
        }
      }, [date.dateTime, router])

    return(
        <MaxWidthWrapper>
             <div className='flex h-screen flex-col items-center justify-center'>
                {date.justDate ? (
                    <div className='flex max-w-lg flex-wrap gap-4'>
                    {times?.map((time, i) => (
                        <div className='rounded-sm bg-gray-100 p-2' key={`time-${i}`}>
                        <button onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))} type='button'>
                            {format(time, 'kk:mm')}
                        </button>
                        </div>
                    ))}
                    </div>
                ) : (
                    <Calendar
                    minDate={now}
                    className='REACT-CALENDAR p-2'
                    view='month'
                    tileDisabled={({ date }) => Array.isArray(closedDays) && closedDays.includes(formatISO(date))}
                    onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
                    />
                )}
                </div>
        </MaxWidthWrapper>
    )
}

export default page