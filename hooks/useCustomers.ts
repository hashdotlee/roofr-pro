import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface CustomerFilter {
  search?: string;
  page?: number;
  limit?: number;
}

const fetchCustomers = async (filter?: CustomerFilter) => {
  const { data } = await fetchWrapper.get(`/api/customers`, {
    params: filter,
  });
  return data;
};

export const useCustomers = (initFilter?: CustomerFilter) => {
  const [filter, setFilter] = useState(initFilter);
  const query = useQuery<ComposeCustomerDTO[]>({
    queryKey: [...baseQueryKey.CUSTOMER_LIST, filter],
    queryFn: () => fetchCustomers(filter),
  });

  return {
    ...query,
    filter,
    setFilter,
  };
};
