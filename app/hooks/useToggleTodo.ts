'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../providers/ToastProvider';
import { type Todo } from './useTodos';

export const toggleTodoFn = async ({ id, completed }: { id: number; completed: boolean }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  })
  if (!res.ok) throw new Error('Failed to update todo')
  return res.json()
}

export function useToggleTodo() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Toggle todo
  const toggleTodo = useMutation({
    mutationFn: toggleTodoFn,
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (prev) =>
        prev?.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
        ) ?? []
      )
      showToast("Successfully toggled todo", "success");
    },
    onError: () => {
      showToast("Error on toggling todo", "error");
    }
  });
  
  return toggleTodo;
}