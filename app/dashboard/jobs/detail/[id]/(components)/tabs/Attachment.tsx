import FileUploader from "@/components/custom/FileUpload";
import useJob from "@/hooks/useJob";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { useParams } from "next/navigation";

export default function Attachments() {
  const jobID = useParams().id as string;
  const { data: job } = useJob(jobID);
  const { mutate: updateJob } = useUpdateJob({ jobId: jobID });
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">
          Attachments
        </div>
      </div>
      <FileUploader
        onChange={(file) => {
          updateJob({
            job: {
              attachments: file,
            },
          });
        }}
        object="attachments"
        value={job?.attachments || []}
      />
    </div>
  );
}
