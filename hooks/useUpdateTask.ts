import { updateTask } from "@/actions/task";
import { TaskDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateTask = ({
  jobId,
  taskId,
}: {
  jobId: string;
  taskId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<TaskDTO>) =>
      updateTask({
        jobId,
        taskId,
        task: data,
      }),
    onSuccess: (_data, variables) => {
      queryClient.setQueriesData(
        { queryKey: [...baseQueryKey.TASK_LIST, jobId] },
        (oldData?: TaskDTO[]) => {
          if (!oldData) return;
          return oldData.map((t) => {
            if (t._id === taskId) {
              return {
                ...t,
                ...variables,
              };
            }
            return t;
          });
        },
      );
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.TASK_LIST, jobId],
        exact: false,
      });
      toast.success("Update task successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
