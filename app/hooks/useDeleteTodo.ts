'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../providers/ToastProvider';
import { type Todo } from './useTodos';

export const deleteTodoFn = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete todo')
  return id;
}

export function useDeleteTodo() {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Delete todo
  const deleteTodo = useMutation({
    mutationFn: deleteTodoFn,
    onSuccess: (id) => {
      queryClient.setQueryData<Todo[]>(['todos'], (prev) =>
        prev?.filter((todo) => todo.id !== id) ?? []
      )
      showToast("Successfully deleted todo", "success");
    },
    onError: () => {
      showToast("Error on deleting todo", "error");
    }
  })
  return deleteTodo;
}