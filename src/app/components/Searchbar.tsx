import React from 'react'
import { IoIosSearch } from 'react-icons/io'

type Props = {
  value: string 
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export default function ({value, onChange}: Props) {
  return (
    <div className='mt-5 border-2 w-full sm:w-fit flex items-center gap-2 rounded-md px-2 py-1'>
      <IoIosSearch className='text-2xl' />
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Search '
        className='w-[350px] max-w-[350px] outline-none bg-inherit px-2 py-1'
      />
    </div>
  )
}
