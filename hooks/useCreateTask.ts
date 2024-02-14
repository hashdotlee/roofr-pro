import { createTask } from "@/actions/task";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateTask = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title }: { title: string }) =>
      createTask({
        jobId,
        title,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.TASK_LIST, jobId],
      });
      toast.success("Task created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
