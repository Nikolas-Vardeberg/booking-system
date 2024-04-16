"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
  } from 'date-fns'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
  import { Fragment, useState } from 'react'
  

const page = () => {

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    let days = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: endOfMonth(firstDayCurrentMonth),
    })
  
    function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
  
    return(
        <>
            <MaxWidthWrapper>
            <div className="pt-16">
                <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                        <h2 className="flex-auto font-semibold text-gray-900">
                            {format(firstDayCurrentMonth, 'MMMM yyyy')}
                        </h2>
                        <button
                            type="button"
                            onClick={previousMonth}
                            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                            onClick={nextMonth}
                            type="button"
                            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                        <div>LØR</div>
                        <div>MAN</div>
                        <div>TIR</div>
                        <div>ONS</div>
                        <div>TOR</div>
                        <div>FRE</div>
                        <div>SØN</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                        {days.map((day, dayIdx) => (
                            <div
                            key={day.toString()}
                            className={cn(
                                'py-1.5'
                            )}
                            >
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                isEqual(day, selectedDay) && 'text-white',
                                !isEqual(day, selectedDay) &&
                                    isToday(day) &&
                                    'text-red-500',
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-900',
                                !isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    !isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-400',
                                isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                isEqual(day, selectedDay) &&
                                    !isToday(day) &&
                                    'bg-gray-900',
                                !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                (isEqual(day, selectedDay) || isToday(day)) &&
                                    'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                            >
                                <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                                </time>
                            </button>

                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </MaxWidthWrapper>
        </>
        
    )
}

export default page;