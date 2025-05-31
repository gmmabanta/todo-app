"use client";

import { useTodoStore } from "../store/todoStore";

import Modal from "./common/Modal";
import Pill from "./common/Pill";
import { useToast } from "../providers/ToastProvider";

export default function TodoModal() {
  const { selectedTodo, setSelectedTodo, deleteTodo } = useTodoStore();
  const { showToast } = useToast();

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
          fn: () => {
            deleteTodo(selectedTodo.id);
            showToast(
              `Successfully deleted todo: ${selectedTodo.title}`,
              "success"
            );
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
