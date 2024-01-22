import { useQuery } from '@tanstack/react-query'

export function useFetch() {
  const api = 'https://api.tvmaze.com/shows'

  const { data, error, isError, isLoading } = useQuery<MovieType[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetch(api)
      const data = res.json()
      return data
    },
  })

  return { data, error, isError, isLoading } 
}

export function useFetchMovie(id: string | number) {
  const api = `https://api.tvmaze.com/shows/${id}`

  const { data, error, isError, isLoading } = useQuery<MovieType>({
    queryKey: ['movies', id],
    queryFn: async () => {
      const res = await fetch(api)
      const data = res.json()
      return data
    },
  })

  return { data, error, isError, isLoading }
}
