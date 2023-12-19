import { useEffect, useState } from "react";

interface TaskFilter {
  done?: boolean;
  page?: number;
  limit?: number;
}

export const useTasks = (jobId: string, initFilter?: TaskFilter) => {
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [filter, setFilter] = useState(initFilter);
  const toggleRefetch = () => setRefetch((prev) => !prev);

  useEffect(() => {
    async function fetchTasks() {
      const params = new URLSearchParams({
        done: filter?.done?.toString() || "",
        page: filter?.page?.toString() || "1",
        limit: filter?.limit?.toString() || "10",
      });
      const res = await fetch(`/api/jobs/${jobId}/tasks?${params.toString()}`);
      const data = await res.json();
      setTasks(data);
    }
    fetchTasks();
  }, [refetch, filter]);

  return {
    tasks,
    filter,
    setFilter,
    toggleRefetch,
  };
};

export const useUrgentTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch(`/api/tasks/urgent`);
      const data = await res.json();
      setTasks(data.data);
    }
    fetchTasks();
  }, []);
  return {
    tasks,
  };
};
