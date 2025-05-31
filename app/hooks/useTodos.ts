'use client';

import { useQuery } from '@tanstack/react-query';

export const fetchTodosFn = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_API_URL}?_limit=10`)
  if (!res.ok) throw new Error('Failed to fetch todos')
  return res.json();
}

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  // Fetch todos
  const { data: todos, isLoading, isError, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodosFn,
  })

  return {
    data: todos,
    isLoading,
    isError,
    error
  }
}