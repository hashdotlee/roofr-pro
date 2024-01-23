import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/hooks/useTasks";
import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useCreateTask } from "@/hooks/useCreateTask";

export default function TasksList() {
  const jobId = useParams().id as string;
  const { data: tasks = [], setFilter, filter } = useTasks(jobId);
  const [title, setTitle] = useState("");

  const { mutate: createTask, isPending } = useCreateTask({
    jobId,
  });

  const handleCreateTask = async () => {
    if (title.length > 0) {
      createTask({
        title,
      });
      setTitle("");
    }
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
          tasks.map((task: any) => <TaskItem task={task} key={task?._id} />)
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
          value={isPending ? "Pending..." : title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTask();
            }
          }}
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
