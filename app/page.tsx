import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen py-2 bg-gray-100 space-x-10'>
      <Link className={buttonVariants({  size: "default", className: "max-md:hidden" })}
        href="/admin" target="_blank"
      >
        Admin <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
      <Link className={buttonVariants({ variant: "outline",  size: "default", className: "max-md:hidden" })}
        href="/booking" target="_blank"
      >
        Booking <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  )
}
