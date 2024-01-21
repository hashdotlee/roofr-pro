import { updateJob } from "@/actions/job";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { cn } from "@/lib/utils";
import { JobStage } from "@/types/job";
import { useQueryClient } from "@tanstack/react-query";
import { useDrop } from "react-dnd";
import JobItem from "./JobItem";

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
  jobs: ComposeJobDTO[];
}) {
  const queryClient = useQueryClient();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "JOB_ITEM",
    drop: (item: { id: string; stage: JobStage }) => {
      // set query cache
      queryClient.setQueriesData(
        {
          queryKey: baseQueryKey.JOB_LIST,
          exact: false,
        },
        (old?: ComposeJobDTO[]) =>
          old?.map((job) => {
            if (job._id === item.id) {
              return {
                ...job,
                stage: tab.type,
              };
            }
            return job;
          }),
      );

      // update db using server action
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
        <div className="text-xs font-semibold text-neutral-600">
          {jobs
            .reduce((acc, curr) => acc + (curr?.jobValue || 0), 0)
            .toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            })}
        </div>
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
