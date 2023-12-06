import JobItem from "./JobItem";
import { useDrop } from "react-dnd";

interface KanbanTab {
  id: string;
  name: string;
}
const tabs: KanbanTab[] = [
  {
    id: "new_lead",
    name: "New Lead",
  },
  {
    id: "appointment_scheduled",
    name: "Appointment Scheduled",
  },
  {
    id: "proposal_sent",
    name: "Proposal Sent/Presented",
  },
  {
    id: "proposal_signed",
    name: "Proposal Signed",
  },
  {
    id: "pre_production",
    name: "Pre-Production",
  },
  {
    id: "post_production",
    name: "Post-Production",
  },
  {
    id: "payment",
    name: "Payment/Ivoicing",
  },
  {
    id: "job_completed",
    name: "Job Completed",
  },
  {
    id: "lost",
    name: "Lost",
  },
  {
    id: "unqualified",
    name: "Unqualified",
  },
];

const jobs = [
  {
    id: 1,
    name: "Job 1",
    status: "new_lead",
  },
  {
    id: 2,
    name: "Job 2",
    status: "new_lead",
  },
  {
    id: 3,
    name: "Job 3",
    status: "new_lead",
  },
];

export default function KanbanView() {
  const [{ isOver }, drop] = useDrop({
    accept: "JOB_ITEM",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="overflow-scroll mt-8 -mx-8 pl-8">
      <div className="flex flex-row gap-3 h-[calc(100vh-12rem)]">
        {tabs.map((tab) => (
          <KanbanTab key={tab.id} tab={tab} />
        ))}
      </div>
    </div>
  );
}

function KanbanTab({ tab }: { tab: KanbanTab }) {
  return (
    <div className="flex flex-col grow-0 shrink-0 w-[300px] bg-gray-50">
      <div className="flex items-center p-4 border-b justify-between sticky">
        <div className="text-neutral-600 flex gap-1 items-center text-sm">
          <span className="font-semibold truncate">{tab.name}</span>
          <span className="font-semibold">(0)</span>
        </div>
        <div className="text-xs font-semibold text-neutral-600">$0.00</div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {jobs.map(
          (item) => item.status === tab.id && <JobItem key={item.id} job={item} />,
        )}
      </div>
    </div>
  );
}
