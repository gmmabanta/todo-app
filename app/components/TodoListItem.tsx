import { useTodoStore } from "../store/todoStore";

import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useToggleTodo } from "../hooks/useToggleTodo";

import ActionIcon from "./common/ActionIcon";
import {
  TrashIcon,
  CheckCircleIcon as CheckCircleOutlineIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

import { type Todo } from "../hooks/useTodos";

type TodoListItemProps = {
  todo: Todo;
};

export default function TodoListItem({ todo }: TodoListItemProps) {
  const { setSelectedTodo } = useTodoStore();

  const { isPending: isDeletePending, mutate: deleteTodo } = useDeleteTodo();
  const { isPending: isTogglePending, mutate: toggleTodo } = useToggleTodo();

  return (
    <div
      key={todo.id}
      className="flex justify-between items-center gap-3 bg-white shadow p-4 rounded"
    >
      <ActionIcon
        isLoading={isTogglePending}
        onClick={() => toggleTodo({ id: todo.id, completed: !todo.completed })}
      >
        {todo.completed ? (
          <CheckCircleSolidIcon className="size-6 text-blue-600" />
        ) : (
          <CheckCircleOutlineIcon className="size-6 text-gray-500" />
        )}
      </ActionIcon>
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
        <ActionIcon
          isLoading={isDeletePending}
          onClick={() => deleteTodo(todo.id)}
          className="hover:bg-red-100 p-1 rounded-full"
        >
          <TrashIcon className="size-6 text-red-500" />
        </ActionIcon>
      </div>
    </div>
  );
}
