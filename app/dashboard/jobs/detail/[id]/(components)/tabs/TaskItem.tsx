import { useParams } from "next/navigation";
import EditTaskDialog from "../dialogs/EditTaskDialog";
import DeleteTaskDialog from "../dialogs/DeleteTaskDialog";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function TaskItem({
  task,
  toggleRefetch,
}: {
  task: any;
  toggleRefetch: any;
}) {
  const jobId = useParams().id as string;
  const [loading, setLoading] = useState(false);

  const debounceLoading = useDebouncedCallback((value) => {
    setLoading(value);
  }, 500);

  const onCheck = () => {
    setLoading(true);
    fetch(`/api/jobs/${jobId}/tasks/${task._id}`, {
      method: "PUT",
      body: JSON.stringify({
        done: !task.done,
      }),
    }).then(() => {
      debounceLoading(false);
      toggleRefetch();
    });
  };

  return (
    <div
      className={`p-4 bg-white rounded-md border
        ${loading ? "opacity-50" : ""}
    `}
    >
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
