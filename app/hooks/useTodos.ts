import { useQuery } from '@tanstack/react-query'
const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchTodos = async () => {
  const res = await fetch(`${API_URL}/todos?_limit=10`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json()
}

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}