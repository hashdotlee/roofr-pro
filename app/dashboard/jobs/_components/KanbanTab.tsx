import { useDrop } from "react-dnd";
import JobItem from "./JobItem";
import { JobStage } from "@/types/job";
import { cn } from "@/lib/utils";
import { useJobStore } from "@/lib/stores/jobStore";
import { updateJob } from "@/actions/job";
import { Job } from "@/models/Job";

export interface IKanbanTab {
  id: string;
  name: string;
  type: JobStage;
}

export default function KanbanTab({
  tab,
  jobs,
}: {
  tab: IKanbanTab;
  jobs: Job[];
}) {
  const moveJob = useJobStore((state) => state.moveJob);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "JOB_ITEM",
    drop: (item: { id: string; stage: JobStage }) => {
      moveJob(item.id, tab.type);
      updateJob(item.id, {
        stage: tab.type,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className={cn(
        "flex flex-col grow-0 shrink-0 w-[320px] bg-gray-200 relative rounded-xl",
        {
          "bg-green-200": isOver,
        },
      )}
      ref={drop}
    >
      <div className="flex items-center p-4 border-b justify-between sticky top-0 bg-inherit">
        <div className="text-neutral-600 flex gap-1 items-center text-sm">
          <span className="font-semibold text-base truncate">{tab.name}</span>
          <span className="font-semibold">({jobs.length})</span>
        </div>
        <div className="text-xs font-semibold text-neutral-600">$0.00</div>
      </div>

      <div className={cn("flex flex-col gap-4 p-4")}>
        {jobs.map(
          (item) =>
            item.stage === tab.type && (
              <JobItem key={String(item._id)} job={item} />
            ),
        )}
      </div>
    </div>
  );
}
