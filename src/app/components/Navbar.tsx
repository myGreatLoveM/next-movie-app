'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {}

export default function Navbar({}: Props) {
  const path = usePathname()

  return (
    <div className='flex justify-between items-center w-full max-w-7xl mx-auto px-5 py-4'>
      <div className='font-bold text-4xl'>Movies</div>
      <div className='flex gap-3'>
        <Link
          href={'/'}
          className={`${
            path === '/' && 'border-b-2 border-blue-500 text-blue-500'
          } text-lg font-semibold tracking-wide sm:text-xl`}
        >
          Home
        </Link>
        <Link
          href={'/favorites'}
          className={`${
            path === '/favorites' && 'border-b-2 border-blue-500  text-blue-500'
          } text-lg font-semibold tracking-wide sm:text-xl`}
        >
          Favorites
        </Link>
      </div>
    </div>
  )
}
