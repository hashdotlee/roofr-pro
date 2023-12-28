import axiosClient from "@/lib/axios";
import baseQueryKey from "@/lib/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const fetchJob = async (id: string) => {
  const { data } = await axiosClient.get(`/api/jobs/${id}`);
  return data;
};

const useJob = (id: string) => {
  return useQuery({
    queryKey: [baseQueryKey, id],
    queryFn: () => fetchJob(id!),
    enabled: !!id,
  });
};

export default useJob;
