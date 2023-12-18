import { useJobStore } from "@/lib/stores/jobStore";
import { useEffect, useState } from "react";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const updateJobs = useJobStore((state) => state.updateJobs);
  const toggleRefetch = () => setRefetch((prev) => !prev);
  useEffect(() => {
    async function fetchJobs() {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      updateJobs(data);
      setJobs(data);
    }
    fetchJobs();
  }, [refetch]);
  return {
    toggleRefetch,
    jobs,
  };
};
