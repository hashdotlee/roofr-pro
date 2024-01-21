import { createJob } from "@/actions/job";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useCreateJob = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { address: string; customer?: string }) => {
      return createJob({
        address: data.address!,
        customer: data.customer,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.JOB_LIST],
        exact: false,
      });
      router.push(`/dashboard/jobs`);
      toast.success("Job created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
