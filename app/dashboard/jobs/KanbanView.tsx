import { useJobs } from "@/hooks/useJobs";
import { useJobStore } from "@/lib/stores/jobStore";
import { cn } from "@/lib/utils";
import { JobStage } from "@/types/job";
import KanbanTab, { IKanbanTab } from "./_components/KanbanTab";

const stages: IKanbanTab[] = [
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

export default function KanbanView() {
  useJobs();

  const jobsFromStore = useJobStore((state) => state.jobs);

  return (
    <div
      className={cn(
        "overflow-scroll h-[calc(100vh-12rem)] mt-8 -mx-8 pl-8 focus:outline-none pb-8",
        "scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-100",
      )}
    >
      <div className="flex flex-row gap-3 min-h-full">
        {stages.map((tab) => (
          <KanbanTab
            key={tab.id}
            tab={tab}
            jobs={jobsFromStore.filter((job) => job.stage === tab.type)}
          />
        ))}
      </div>
    </div>
  );
}
