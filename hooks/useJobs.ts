import { useJobStore } from "@/lib/stores/jobStore";
import { useEffect, useState } from "react";

export enum SortBy {
  LAST_UPDATED = "updatedAt",
  JOB_VALUE = "jobValue",
}

interface JobFilter {
  search?: string;
  updatedAt?: string;
  stage?: string[];
  sortBy?: SortBy;
}

export const useJobs = (initFilter?: JobFilter) => {
  const [filter, setFilter] = useState(initFilter);
  const [refetch, setRefetch] = useState(false);
  const setJobs = useJobStore((state) => state.setJobs);
  const jobFromStore = useJobStore((state) => state.jobs);
  const toggleRefetch = () => setRefetch((prev) => !prev);
  useEffect(() => {
    async function fetchJobs() {
      const params = new URLSearchParams({
        search: filter?.search || "",
        updatedAt: filter?.updatedAt || "",
        stage: filter?.stage?.join(",") || "",
        sortBy: filter?.sortBy || "",
      });
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const { data } = await res.json();
      setJobs(data);
    }
    fetchJobs();
  }, [refetch, filter]);
  return {
    toggleRefetch,
    filter,
    setFilter,
    jobs: jobFromStore,
  };
};
