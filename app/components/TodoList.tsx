import { useTodoStore } from "../store/todoStore";
import { useToast } from "../providers/ToastProvider";

import TodoModal from "./TodoModal";
import {
  TrashIcon,
  CheckCircleIcon as CheckCircleOutlineIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

export default function TodoList() {
  const { todos, deleteTodo, toggleDone, setSelectedTodo, selectedTodo } =
    useTodoStore();
  const { showToast } = useToast();

  return (
    <div className="space-y-2 w-md min-w-sm max-w-lg">
      {todos.length == 0 ? (
        <div className="flex justify-center py-2 text-gray-500 italic">
          Completed all todos
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center gap-3 bg-white shadow p-4 rounded"
          >
            <button onClick={() => toggleDone(todo.id)}>
              {todo.completed ? (
                <CheckCircleSolidIcon className="size-6 text-blue-600" />
              ) : (
                <CheckCircleOutlineIcon className="size-6 text-gray-500" />
              )}
            </button>
            <div
              onClick={() => setSelectedTodo(todo)}
              className="flex-1 cursor-pointer"
            >
              <p
                className={
                  todo.completed ? "line-through text-gray-400" : "text-black"
                }
              >
                {todo.title}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                  showToast(
                    `Successfully deleted todo: ${todo.title}`,
                    "success"
                  );
                }}
                className="hover:bg-red-100 p-1 rounded-full"
              >
                <TrashIcon className="size-6 text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}
      {selectedTodo && <TodoModal />}
    </div>
  );
}
