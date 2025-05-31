import { create } from 'zustand'

interface Todo {
  id: number
  title: string
  completed: boolean
}

interface TodoStore {
  todos: Todo[]
  selectedTodo: Todo | null
  setTodos: (todos: Todo[]) => void
  setSelectedTodo: (todo: Todo | null) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  selectedTodo: null,
  setTodos: (todos) => set({ todos }),
  setSelectedTodo: (todo) => set({ selectedTodo: todo })
}))
