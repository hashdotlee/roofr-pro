import { ComposeJobDTO } from "@/dtos/compose-job.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

const fetchJob = async (id: string) => {
  const { data } = await fetchWrapper.get(`/api/jobs/${id}`);
  return data;
};

const useJob = (id: string) => {
  return useQuery<ComposeJobDTO>({
    queryKey: [...baseQueryKey.JOB_DETAILS, id],
    queryFn: () => fetchJob(id!),
    enabled: !!id,
  });
};

export default useJob;
