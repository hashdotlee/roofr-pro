import { JobStatus } from "@/types/job";
import KanbanTab, { IKanbanTab } from "./_components/KanbanTab";
import { useJobStore } from "@/lib/stores/jobStore";
import { cn } from "@/lib/utils";

const tabs: IKanbanTab[] = [
  {
    id: "new_lead",
    name: "New Lead",
    type: JobStatus.NEW_LEAD,
  },
  {
    id: "appointment_scheduled",
    name: "Appointment Scheduled",
    type: JobStatus.APPOINTMENT_SCHEDULED,
  },
  {
    id: "proposal_sent",
    name: "Proposal Sent/Presented",
    type: JobStatus.PROPOSAL_SENT,
  },
  {
    id: "proposal_signed",
    name: "Proposal Signed",
    type: JobStatus.PROPOSAL_SIGNED,
  },
  {
    id: "pre_production",
    name: "Pre-Production",
    type: JobStatus.PRE_PRODUCTION,
  },
  {
    id: "post_production",
    name: "Post-Production",
    type: JobStatus.POST_PRODUCTION,
  },
  {
    id: "payment",
    name: "Payment/Ivoicing",
    type: JobStatus.PAYMENT,
  },
  {
    id: "job_completed",
    name: "Job Completed",
    type: JobStatus.JOB_COMPLETED,
  },
  {
    id: "lost",
    name: "Lost",
    type: JobStatus.LOST,
  },
  {
    id: "unqualified",
    name: "Unqualified",
    type: JobStatus.UNQUALIFIED,
  },
];

export default function KanbanView() {
  const jobs = useJobStore((state) => state.jobs);

  return (
    <div
      className={cn(
        "overflow-scroll h-[calc(100vh-12rem)] mt-8 -mx-8 pl-8 focus:outline-none pb-8",
        "scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-100"
      )}
    >
      <div className="flex flex-row gap-3 min-h-full">
        {tabs.map((tab) => (
          <KanbanTab
            key={tab.id}
            tab={tab}
            jobs={jobs.filter((job) => job.status === tab.type)}
          />
        ))}
      </div>
    </div>
  );
}
