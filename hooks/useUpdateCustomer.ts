import { updateCustomer } from "@/actions/customer";
import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateCustomer = ({ customerId }: { customerId: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ customer }: { customer: Partial<ComposeCustomerDTO> }) =>
      updateCustomer({
        id: customerId,
        customerPayload: customer,
      }),
    onSuccess: (_data, variables) => {
      // set query cache
      queryClient.setQueriesData(
        {
          queryKey: [...baseQueryKey.CUSTOMER_LIST, customerId],
        },
        (old?: ComposeCustomerDTO[]) =>
          old?.map((customer) => {
            if (customer._id === customerId) {
              return {
                ...customer,
                ...variables.customer,
              };
            }
            return customer;
          }),
      );
      queryClient.setQueryData(
        [...baseQueryKey.CUSTOMER_DETAILS, customerId],
        (old?: ComposeCustomerDTO) => {
          if (!old) return;
          return {
            ...old,
            ...variables.customer,
          };
        },
      );

      toast.success("Customer updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong");
    },
  });
};
