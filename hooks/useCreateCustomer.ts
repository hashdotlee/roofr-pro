import { createCustomer } from "@/actions/customer";
import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customer }: { customer: Partial<ComposeCustomerDTO> }) =>
      createCustomer({
        customer,
      }),
    onSuccess: () => {
      // set query cache
      queryClient.invalidateQueries({
        queryKey: [...baseQueryKey.CUSTOMER_LIST],
        exact: false,
      });

      toast.success("Customer created successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
}
