import { TaskDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface TaskFilter {
  done?: boolean;
  page?: number;
  limit?: number;
}

const fetchTasks = async (jobId: string, filter?: TaskFilter) => {
  const { data } = await fetchWrapper.get(`/api/jobs/${jobId}/tasks`, {
    params: filter,
  });
  if (data === null) return [];
  return data;
};

const fetchUrgentTasks = async () => {
  const { data } = await fetchWrapper.get(`/api/tasks/urgent`);
  return data;
};

export const useTasks = (jobId: string, initFilter?: TaskFilter) => {
  const [filter, setFilter] = useState(
    initFilter || {
      done: true,
    },
  );

  const query = useQuery<TaskDTO[]>({
    queryKey: [...baseQueryKey.TASK_LIST, jobId, filter],
    queryFn: () => fetchTasks(jobId, filter),
  });

  return {
    ...query,
    filter,
    setFilter,
  };
};

export const useUrgentTasks = () => {
  return useQuery<TaskDTO[]>({
    queryKey: [...baseQueryKey.URGENT_TASK_LIST],
    queryFn: () => fetchUrgentTasks(),
  });
};
