import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { cn } from "@/lib/utils";
import { JobStage } from "@/types/job";
import KanbanTab, { IKanbanTab } from "./(components)/KanbanTab";
import { memo } from "react";

const tabs: IKanbanTab[] = [
  {
    id: "new_lead",
    name: "New Lead",
    type: JobStage.NEW_LEAD,
  },
  {
    id: "appointment_scheduled",
    name: "Appointment Scheduled",
    type: JobStage.APPOINTMENT_SCHEDULED,
  },
  {
    id: "proposal_sent",
    name: "Proposal Sent/Presented",
    type: JobStage.PROPOSAL_SENT,
  },
  {
    id: "proposal_signed",
    name: "Proposal Signed",
    type: JobStage.PROPOSAL_SIGNED,
  },
  {
    id: "pre_production",
    name: "Pre-Production",
    type: JobStage.PRE_PRODUCTION,
  },
  {
    id: "post_production",
    name: "Post-Production",
    type: JobStage.POST_PRODUCTION,
  },
  {
    id: "payment",
    name: "Payment/Ivoicing",
    type: JobStage.PAYMENT,
  },
  {
    id: "job_completed",
    name: "Job Completed",
    type: JobStage.JOB_COMPLETED,
  },
  {
    id: "lost",
    name: "Lost",
    type: JobStage.LOST,
  },
  {
    id: "unqualified",
    name: "Unqualified",
    type: JobStage.UNQUALIFIED,
  },
];

function KanbanView({
  filter,
  jobs,
  isLoading,
}: {
  filter: any;
  jobs: ComposeJobDTO[];
  isLoading: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-scroll h-[calc(100vh-12rem)] mt-8 -mx-8 pl-8 focus:outline-none pb-8",
        "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-gray-100"
      )}
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="flex flex-row gap-3 min-h-full">
          {tabs.map(
            (tab) =>
              filter?.stage?.includes(tab.type) && (
                <KanbanTab
                  key={tab.id}
                  tab={tab}
                  jobs={jobs.filter((job) => job.stage === tab.type)}
                />
              )
          )}
        </div>
      )}
    </div>
  );
}

export default memo(KanbanView);
