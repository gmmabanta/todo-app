"use client";

import { useTodoStore } from "../store/todoStore";

import Modal from "./common/Modal";
import Pill from "./common/Pill";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

export default function TodoModal() {
  const { selectedTodo, setSelectedTodo } = useTodoStore();
  const { isPending: isDeletePending, mutate: deleteTodo } = useDeleteTodo();
  if (!selectedTodo) return null;

  return (
    <Modal
      open={Boolean(selectedTodo.id)}
      toggle={(value: boolean) => !value && setSelectedTodo(null)}
      title="Todo Details"
      body={
        <div className="flex flex-col gap-1">
          <div>{selectedTodo.title}</div>
          <div className="text-gray-500 text-sm">
            Status:{" "}
            <Pill status={selectedTodo.completed ? "completed" : "pending"} />
          </div>
        </div>
      }
      actionButtons={[
        {
          text: "Delete",
          type: "delete",
          disabled: isDeletePending,
          fn: () => {
            deleteTodo(selectedTodo.id);
          },
        },
        {
          text: "Cancel",
          type: "cancel",
          fn: () => setSelectedTodo(null),
        },
      ]}
    />
  );
}
