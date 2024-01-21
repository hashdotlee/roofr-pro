import { deleteJob } from "@/actions/job";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteJob = (jobId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return deleteJob(jobId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.JOB_LIST],
        exact: false,
      });
      toast.success("Job deleted successfully");
    },
  });
};
