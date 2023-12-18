import { useJobStore } from "@/lib/stores/jobStore";
import { useEffect, useState } from "react";

interface JobFilter {
  search?: string;
  updatedAt?: string;
  status?: string;
  sortBy?: string;
}

export const useJobs = (initFilter?: JobFilter) => {
  const [filter, setFilter] = useState(initFilter);
  const [jobs, setJobs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const updateJobs = useJobStore((state) => state.updateJobs);
  const toggleRefetch = () => setRefetch((prev) => !prev);
  useEffect(() => {
    async function fetchJobs() {
      const params = new URLSearchParams({
        search: filter?.search || "",
        updatedAt: filter?.updatedAt || "",
        status: filter?.status || "",
        sortBy: filter?.sortBy || "",
      });
      const res = await fetch(`/api/jobs?${params.toString()}`);
      const { data } = await res.json();
      updateJobs(data);
      setJobs(data);
    }
    fetchJobs();
  }, [refetch, filter]);
  return {
    toggleRefetch,
    filter,
    setFilter,
    jobs,
  };
};
