import { useEffect, useState } from 'react'

export function useSearch(movies: MovieType[] | undefined) {
  const [search, setSearch] = useState('')

  const [debouncedSearchData, setDebounceSearchData] = useState<MovieType[]>()

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceSearchData(movies)
    }, 1000)

    return () => {
      clearTimeout(id)
    }
  }, [movies, search])

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceSearchData((prev) => {
        return prev?.filter((m) =>
          m.name.toLowerCase().includes(search.toLowerCase())
        )
      })
    }, 2000)

    return () => {
      clearTimeout(id)
    }
  }, [search])

  const data = search
    ? movies?.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
    : movies

  return { search, setSearch, data, debouncedSearchData }
}
