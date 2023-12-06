import { Input } from "@/components/ui/input";
import { Calendar, Pencil, Trash, User } from "lucide-react";
import { useState } from "react";

export default function TaskItem() {
  const [onEdit, setOnEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="p-4 rounded-md bg-white border"
      onBlur={() => setOnEdit(false)}
    >
      <div className="flex gap-4 items-center justify-between">
        <div className="flex text-sm items-center gap-4 w-full">
          <input type="checkbox" checked={checked} />
          {onEdit ? (
            <Input
              value="Task 1"
              autoFocus
              className="border-0 w-full focus:outline-none py-2 px-0 focus-visible:outline-none focus-visible:outline-offset-0"
            />
          ) : (
            <span
              role="button"
              onClick={() => setChecked(!checked)}
              className={`${checked ? "line-through" : ""} w-full`}
            >
              Task 1
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Pencil
            role="button"
            className="h-4 w-4 text-blue-500 cursor-pointer"
            onClick={() => setOnEdit(true)}
          />
          <Trash role="button" className="h-4 w-4 text-red-500" />
        </div>
      </div>
      {onEdit && (
        <div className="flex items-center gap-3 mt-4 text-xs font-semibold text-neutral-500">
          <button className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span> Assignee</span>
          </button>
          <button className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span> Due Date</span>
          </button>
        </div>
      )}
    </div>
  );
}
