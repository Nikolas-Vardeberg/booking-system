import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='h-[90vh] flex items-center justify-center flex-col space-y-4'>
        <h2 className='text-7xl'>404</h2>
        <h2 className='font-bold text-black text-2xl'>Not Found</h2>
        <p className='text-slate-600'>Mens vi håndterer flytting med presisjon, treffer til og med de digitale lastebilene noen ganger en fartsdump.</p>
        <Link href="/" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Home <ArrowRight className='ml-2 w-4 h-4'/>
        </Link>
    </div>
  )
}