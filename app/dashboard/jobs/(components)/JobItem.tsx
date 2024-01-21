import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import { getTimeAgo } from "@/lib/utils";
import { Dot } from "lucide-react";
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

  return (
    <div
      className={`w-full flex flex-col min-h-20 bg-white cursor-pointer border rounded-md ${
        isDragging ? "opacity-50" : ""
      }`}
      onClick={() => router.push(`/dashboard/jobs/detail/${job._id}`)}
      ref={drag}
    >
      <div className="font-semibold p-4 text-sm border-b text-gray-800">
        {job.address}
      </div>
      <div className="flex justify-between px-4 py-2 bg-gray-100 items-center">
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-semibold text-gray-400">
            Updated {getTimeAgo(String(job?.updatedAt))}
          </div>
          <Image
            src="/default_avatar.svg"
            alt="Picture of the author"
            width={24}
            height={24}
          />
        </div>
        <div>
            <Dot className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
}
