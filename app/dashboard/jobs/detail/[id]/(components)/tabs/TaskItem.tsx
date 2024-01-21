import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useParams } from "next/navigation";
import DeleteTaskDialog from "../dialogs/DeleteTaskDialog";
import EditTaskDialog from "../dialogs/EditTaskDialog";

export default function TaskItem({ task }: { task: any }) {
  const jobId = useParams().id as string;

  const { mutate: handleUpdateTask, isPending } = useUpdateTask({
    jobId,
    taskId: task._id,
  });

  const handleDoneTask = () => {
    handleUpdateTask({
      done: !task.done,
    });
  };

  return (
    <div
      className={`p-4 bg-white rounded-md border
        ${isPending ? "opacity-50" : ""}
    `}
    >
      <div className="flex gap-4 items-center justify-between">
        <div className="flex text-sm items-center gap-4 w-full">
          <input
            type="checkbox"
            onChange={() => handleDoneTask()}
            checked={task.done}
          />
          <span
            role="button"
            onClick={() => handleDoneTask()}
            className={`${
              task.done ? "line-through text-neutral-400" : ""
            } w-full`}
          >
            {task?.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <EditTaskDialog task={task} taskId={task._id} jobId={jobId} />
          <DeleteTaskDialog taskId={task._id} jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
