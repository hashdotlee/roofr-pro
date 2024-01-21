import { ComposeAccountDTO } from "@/dtos/compose-account.dto";
import baseQueryKey from "@/lib/constants/queryKey";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface AccountFilter {
  search?: string;
  page?: number;
  limit?: number;
}

const fetchAccounts = async (filter?: AccountFilter) => {
  const { data } = await fetchWrapper.get(`/api/accounts`, {
    params: filter,
  });
  return data;
};

export default function useAccounts(initFilter?: AccountFilter) {
  const [filter, setFilter] = useState<AccountFilter>(
    initFilter || <AccountFilter>{},
  );

  const query = useQuery<ComposeAccountDTO[]>({
    queryKey: [...baseQueryKey.ACCOUNT_LIST, filter],
    queryFn: () => fetchAccounts(filter),
  });
  return {
    ...query,
    filter,
    setFilter,
  };
}
