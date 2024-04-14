import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
      <Link href="/admin/signin">
        Gå Til admin
      </Link>
    </div>
  )
}
