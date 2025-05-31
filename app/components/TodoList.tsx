"use client";

import { useEffect } from "react";

import { useTodoStore } from "../store/todoStore";
import { useToast } from "../providers/ToastProvider";
import { useTodos } from "../hooks/useTodos";

import Loader from "./common/Loader";
import TodoModal from "./TodoModal";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { todos, selectedTodo } = useTodoStore();
  const { showToast } = useToast();

  const { data, error, isLoading } = useTodos();
  const { setTodos } = useTodoStore();

  useEffect(() => {
    if (data) setTodos(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) showToast("Failed to fetch todos", "error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (isLoading) return <Loader type="page" size="24" />;

  return (
    <>
      <h1 className="mb-4 font-bold text-2xl">To Do List</h1>
      <div className="space-y-2 w-md min-w-sm max-w-lg">
        {todos.length == 0 ? (
          <div className="flex justify-center py-2 text-gray-500 italic">
            Completed all todos
          </div>
        ) : (
          todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)
        )}
        {selectedTodo && <TodoModal />}
      </div>
    </>
  );
}
