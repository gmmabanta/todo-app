"use client";

import { useEffect } from "react";
import { useTodos } from "../hooks/useTodos";
import { useTodoStore } from "../store/todoStore";
import TodoList from "../components/TodoList";
import { useToast } from "../providers/ToastProvider";
import Loader from "../components/common/Loader";

export default function TodosPage() {
  const { data, error, isLoading } = useTodos();
  const { setTodos } = useTodoStore();
  const { showToast } = useToast();

  useEffect(() => {
    if (data) {
      setTodos(data);
      showToast("Todos successfully loaded", "success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) showToast("Failed to fetch todos", "error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 max-w-lg">
      <h1 className="mb-4 font-bold text-2xl">To Do List</h1>
      <TodoList />
    </div>
  );
}
