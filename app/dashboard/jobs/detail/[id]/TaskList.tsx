import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/hooks/useTasks";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import TaskItem from "./TaskItem";

export default function TasksList() {
  const jobId = useParams().id as string;
  const { tasks, toggleRefetch, setFilter, filter } = useTasks(jobId);
  const [title, setTitle] = useState("");

  const handleCreateTask = () => {
    fetch(`/api/jobs/${jobId}/tasks`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    }).then(() => {
      toast.success("Task created");
      toggleRefetch();
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">Tasks</div>
        <button
          onClick={() => {
            setFilter({
              ...filter,
              done: !filter?.done,
            });
          }}
          className={`px-4 py-2 rounded-full text-xs bg-gray-200 font-semibold
            ${
              filter?.done
                ? "text-gray-400 bg-gray-100"
                : "text-blue-500 bg-blue-100"
            } `}
        >
          {!filter?.done ? "Hide" : "Show"} completed
        </button>
      </div>
      <div className="flex mt-4 flex-col gap-4">
        {tasks.length > 0 ? (
          tasks.map((task: any) => (
            <TaskItem
              toggleRefetch={toggleRefetch}
              task={task}
              key={task?._id}
            />
          ))
        ) : (
          <div className="text-center text-xs text-gray-400">No tasks yet</div>
        )}
      </div>
      <hr className="my-4" />
      <label
        className={`relative rounded-md border bg-white block
        `}
      >
        <Input
          className="w-full py-6 border-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-0"
          placeholder="Add a task"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="task"
          id="task"
        />
        <Button
          onClick={() => handleCreateTask()}
          className="p-0 bg-transparent hover:bg-transparent absolute top-1/2 right-2 -translate-y-1/2 "
        >
          <Send className="w-5 h-5 text-blue-500" />
        </Button>
      </label>
    </>
  );
}
