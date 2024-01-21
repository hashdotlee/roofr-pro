import { updateJob } from "@/actions/job";
import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateJob = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ job }: { job: Partial<ComposeJobDTO> }) =>
      updateJob({
        jobId,
        job,
      }),
    onSuccess: (_data, variables) => {
      // set query cache
      queryClient.setQueriesData(
        {
          queryKey: [...baseQueryKey.JOB_LIST, jobId],
        },
        (old?: ComposeJobDTO[]) =>
          old?.map((job) => {
            if (job._id === jobId) {
              return {
                ...job,
                ...variables.job,
              };
            }
            return job;
          }),
      );
      queryClient.setQueryData(
        [...baseQueryKey.JOB_DETAILS, jobId],
        (old?: ComposeJobDTO) => {
          if (!old) return;
          return {
            ...old,
            ...variables.job,
          };
        },
      );

      toast.success("Job updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
