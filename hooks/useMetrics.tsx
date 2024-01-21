import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

const fetchMetrics = async (jobId: string) => {
  const { data } = await fetchWrapper.get(`/api/jobs/${jobId}/metrics`);
  return data;
};

export const useMetrics = (jobId: string) => {
  return useQuery({
    queryKey: [...baseQueryKey.JOB_METRICS, jobId],
    queryFn: () => fetchMetrics(jobId),
    enabled: !!jobId,
  });
};
