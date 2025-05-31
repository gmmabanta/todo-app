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
  deleteTodo: (id: number) => void
  toggleDone: (id: number) => void
  setSelectedTodo: (todo: Todo | null) => void
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  selectedTodo: null,
  setTodos: (todos) => set({ todos }),
  deleteTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),
  toggleDone: (id) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  setSelectedTodo: (todo) => set({ selectedTodo: todo })
}))
