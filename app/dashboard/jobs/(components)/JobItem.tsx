import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { getTimeAgo } from "@/lib/utils";
import { JobStage } from "@/types/job";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDrag } from "react-dnd";

export default function JobItem({ job }: { job: ComposeJobDTO }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "JOB_ITEM",
    item: { id: job._id, stage: job.stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const router = useRouter();
  const { mutate: updateJob } = useUpdateJob({
    jobId: job._id,
  });

  return (
    <div
      className={`w-full flex flex-col min-h-20 bg-white border rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        onClick={() => router.push(`/dashboard/jobs/detail/${job._id}`)}
        className="p-4 space-y-2 text-sm border-b cursor-pointer text-gray-800"
        ref={drag}
      >
        <p className="font-semibold ">{job.address}</p>
        <span className="py-1 px-2 text-xs bg-gray-200/50 inline-block text-neutral-600 rounded-2xl">
          {job?.tasks?.length} tasks
        </span>
        <span className="py-1 px-2 text-xs bg-gray-200/50 inline-block text-neutral-600 rounded-2xl">
          {job?.jobValue &&
            job?.jobValue?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
        </span>
      </div>
      <div className="flex justify-between px-4 py-1 bg-gray-100 items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/default_avatar.svg"
            alt="Picture of the author"
            width={24}
            height={24}
          />
          <div className="text-[10px] font-semibold text-gray-400">
            Updated {getTimeAgo(String(job?.updatedAt))}
          </div>
        </div>
        <button className="w-8 h-8 rounded-full hover:ring-2 hover:bg-gray-200/80 hover:ring-gray-50">
          <SelectStagePopover
            position={job?.stage}
            setPosition={(pos) => {
              updateJob({
                job: {
                  stage: pos as JobStage,
                },
              });
            }}
          />
        </button>
      </div>
    </div>
  );
}

const SelectStagePopover = ({
  position,
  setPosition,
}: {
  position?: JobStage;
  setPosition: (position: string) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 rounded-full hover:ring-2 hover:bg-gray-200/80 hover:ring-gray-50">
          <MoreHorizontal className="w-4 h-4 m-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Move to</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {Object.values(JobStage).map((stage) => (
            <DropdownMenuRadioItem value={stage} key={stage}>
              {stage}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
