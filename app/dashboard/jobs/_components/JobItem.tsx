import { useDrag } from "react-dnd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JobStatus } from "@/types/job";

export type Job = {
  id: number;
  name: string;
  status: JobStatus;
};

export default function JobItem({ job }: { job: Job }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "JOB_ITEM",
    item: { id: job.id, status: job.status },
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
      onClick={() => router.push(`/dashboard/jobs/detail/${job.id}`)}
      ref={drag}
    >
      <div className="font-semibold p-4 text-sm border-b text-gray-800">
        {job.name}
      </div>
      <div className="flex justify-between px-4 py-2 bg-gray-100 items-center">
        <div></div>
        <div className="flex items-center ml-auto gap-2">
          <div className="text-[10px] font-semibold text-gray-400">
            Updated 3 hours ago
          </div>
          <Image
            src="/default_avatar.svg"
            alt="Picture of the author"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}
