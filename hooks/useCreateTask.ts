import { createTask } from "@/actions/task";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title }: { title: string }) =>
      createTask({
        jobId,
        title,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([...baseQueryKey.JOB_DETAILS, jobId]);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
