import { deleteCustomer } from "@/actions/customer";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useDeleteCustomer = (customerId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => {
      return deleteCustomer({ id: customerId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.CUSTOMER_LIST],
        exact: false,
      });
      toast.success("Customer deleted successfully");
      router.back();
    },
  });
};
