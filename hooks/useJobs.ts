import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { JobStage } from "@/types/job";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

export const initFilter: JobFilter = {
  stage: [
    JobStage.NEW_LEAD,
    JobStage.APPOINTMENT_SCHEDULED,
    JobStage.PROPOSAL_SENT,
    JobStage.PROPOSAL_SIGNED,
    JobStage.PRE_PRODUCTION,
    JobStage.POST_PRODUCTION,
    JobStage.PAYMENT,
    JobStage.JOB_COMPLETED,
    JobStage.LOST,
    JobStage.UNQUALIFIED,
  ],
};

const fetchJobs = async (filter: JobFilter) => {
  const { data } = await fetch(`/api/jobs`, {
      method: "GET",
  });
  return data;
};

export const useJobs = () => {
  const [filter, setFilter] = useState(initFilter);
  const query = useQuery<ComposeJobDTO[]>({
    queryKey: [...baseQueryKey.JOB_LIST, filter],
    queryFn: () => fetchJobs(filter),
  });

  return {
    ...query,
    filter,
    setFilter,
  };
};
