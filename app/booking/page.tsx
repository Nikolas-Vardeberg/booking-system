"use client"

import Calandar from "@/components/Calandar"
import { DateTime } from "@/utils/types"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const page = () => {
  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null
  }) 

    return(
      <div>
        {!date.dateTime && <Calandar setDate={setDate} date={date}  />}
        {date.dateTime && false ? (
          <div>menu</div>
        ): (
          <div className="flex h-[90vh] items-center justify-center">
            <Loader2 className="animate-spin"/>
          </div>
        )}
      </div>
    )
}

export default page