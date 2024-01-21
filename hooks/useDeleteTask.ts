import { DeleteTask } from "@/actions/task";
import { TaskDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteTask = ({
  jobId,
  taskId,
}: {
  jobId: string;
  taskId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => DeleteTask({ jobId, taskId }),
    onSuccess: () => {
      queryClient.setQueriesData(
        { queryKey: [...baseQueryKey.TASK_LIST, jobId] },
        (oldData?: TaskDTO[]) => {
          if (!oldData) return;
          return oldData.filter((t) => t._id !== taskId);
        },
      );
      toast.success("Delete task successfully!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
