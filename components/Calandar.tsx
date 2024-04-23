import { DateTime } from "@/utils/types";
import dynamic from "next/dynamic";
import { Dispatch, FC, SetStateAction } from "react";
import Calendar from 'react-calendar'

import "./Calandar.css"
import { add, format } from "date-fns";

const DynamicCalendar = dynamic(() => import('react-calendar'), { ssr: false })

interface indexProps {
    date: DateTime
    setDate: Dispatch<SetStateAction<DateTime>>
}

const Calandar: FC<indexProps> = ({ setDate, date}) => {

    const getTimes = () => {
        if (!date.justDate) return


        const { justDate } = date

        const beginning = add(justDate, {hours: 9})
        const end = add(justDate, { hours: 17 })
        const interval = 30

        const times = []
        for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
            times.push(i)
        }

        return times
    }

    const times = getTimes()

    return(
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
          <DynamicCalendar
            className='REACT-CALENDAR p-2'
            view='month'
            onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
          />
        )}
      </div>
    )
}

export default Calandar