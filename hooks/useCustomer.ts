import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";

const fetchCustomer = async (id: string) => {
  const { data } = await fetchWrapper.get(`/api/customers/${id}`);
  return data;
};

export const useCustomer = (id: string) => {
  return useQuery<ComposeCustomerDTO>({
    queryKey: [...baseQueryKey.CUSTOMER_DETAILS, id],
    queryFn: () => fetchCustomer(id),
  });
};
