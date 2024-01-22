import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CiBookmark } from 'react-icons/ci'
import { PiTelevisionFill } from 'react-icons/pi'
import { useAtom } from 'jotai'
import { favMoviesAtom } from '../context/atom'
import { IoBookmark } from 'react-icons/io5'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useFavMovies } from '../customHooks/useFavMovies'

type Props = {
  url: string
  year: string
  rating: number
  name: string
  id: number
  movie: MovieType
}

export default function MovieCard({
  url,
  year,
  rating,
  name,
  id,
  movie,
}: Props) {
  const { favMovies, addToFav, removeFromFav } = useFavMovies()

  const [animationParent] = useAutoAnimate()

  const isFav = favMovies.some((fav) => fav.id === id)

  function handleFavMovies() {
    if (isFav) {
      removeFromFav(movie)
    } else {
      addToFav(movie)
    }
  }

  return (
    <div className='relative'>
      <button
        ref={animationParent}
        className={`absolute z-10 right-2 top-1 cursor-pointer h-7 w-7 ${
          isFav ? 'bg-black/90' : 'bg-black/60'
        } rounded-full flex justify-center items-center ${
          isFav ? 'hover:bg-black/60' : 'hover:bg-black/90'
        }`}
        onClick={handleFavMovies}
      >
        {isFav ? <IoBookmark /> : <CiBookmark />}
      </button>
      <Link href={`/${id}`} className=' flex flex-col gap-1 w-[275px] '>
        <div className='w-full h-[150px] rounded-md overflow-hidden hover:scale-105 transition-all'>
          <Image
            src={url}
            width={400}
            height={400}
            className='w-full h-full object-cover'
            alt='poster'
          />
        </div>
        <div className='text-sm flex gap-3 items-center justify-between px-2   text-gray-500'>
          <span>{year}</span>
          <span className='flex items-center gap-2'>
            <PiTelevisionFill className='text-lg' />
            <span>TV Series</span>
          </span>
          <span>{rating}</span>
        </div>
        <span className='px-2 text-normal'>{name}</span>
      </Link>
    </div>
  )
}
