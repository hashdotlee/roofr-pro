import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import EditTaskDialog from "./EditTaskDialog";
import { useTasks } from "@/hooks/useTasks";
import DeleteTaskDialog from "./DeleteTaskDialog";

export default function TaskItem({
  task,
  toggleRefetch,
}: {
  task: any;
  toggleRefetch: any;
}) {
  const jobId = useParams().id as string;
  const onCheck = () => {
    fetch(`/api/jobs/${jobId}/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({
        done: !task.done,
      }),
    }).then(() => {
      toggleRefetch();
    });
  };

  return (
    <div className="p-4 rounded-md bg-white border">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex text-sm items-center gap-4 w-full">
          <input
            type="checkbox"
            onChange={() => onCheck()}
            checked={task.done}
          />
          <span
            role="button"
            onClick={() => onCheck()}
            className={`${
              task.done ? "line-through text-neutral-400" : ""
            } w-full`}
          >
            {task?.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <EditTaskDialog task={task} toggleRefetch={toggleRefetch} />
          <DeleteTaskDialog
            taskId={task._id}
            jobId={jobId}
            toggleRefetch={toggleRefetch}
          />
        </div>
      </div>
    </div>
  );
}
