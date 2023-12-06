import { Input } from "@/components/ui/input";
import TaskItem from "./TaskItem";
import { Calendar, Send, User } from "lucide-react";
import { useState } from "react";

export default function TasksList() {
  const [onCreate, setOnCreate] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">Tasks</div>
        <button className="px-4 py-2 rounded-full text-xs bg-gray-200 font-semibold">
          Hide completed
        </button>
      </div>
      <div className="flex mt-4 flex-col gap-4">
        <TaskItem />
      </div>
      <hr className="my-4" />
      <label
        htmlFor="task"
        className={`relative rounded-md border bg-white block ${
          onCreate ? "border-blue-500" : "border-gray-200"
        }`}
      >
        <Input
          className="w-full py-6 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
          onFocus={() => setOnCreate(true)}
          onBlur={() => setOnCreate(false)}
          placeholder="Add a task"
          type="text"
          name="task"
          id="task"
        />
        <Send className="absolute top-1/2 right-2 -translate-y-1/2 w-5 h-5 text-blue-500" />
        {onCreate && (
          <div className="flex items-center p-2 gap-3 text-xs font-semibold text-neutral-500">
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
      </label>
    </>
  );
}
