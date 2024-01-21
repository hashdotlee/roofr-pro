import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

const fetchNotes = async (jobId: string) => {
  const { data } = await fetchWrapper.get(`/api/jobs/${jobId}/notes`);
  return data;
};

export const useNotes = (jobId: string) => {
  return useQuery({
    queryKey: ["notes", jobId],
    queryFn: () => fetchNotes(jobId),
    enabled: !!jobId,
  });
};
