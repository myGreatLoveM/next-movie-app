import Navbar from "./Navbar"

type Props = {}

export default function Error({}: Props) {
  return (
    <main className='max-w-7xl mx-auto min-h-screen px-2 sm:px-4 md:px-6'>
      <Navbar />
      <h1 className='text-4xl font-bold text-center mt-10'>
        Something went wrong ...
      </h1>
    </main>
  )
}