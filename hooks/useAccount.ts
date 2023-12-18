import { Account } from "@/models/Account";
import { useEffect, useState } from "react";

interface AccountFilter {
  search?: string;
  page?: number;
  limit?: number;
}

export default function useAccounts(initFilter?: AccountFilter) {
  const [filter, setFilter] = useState<AccountFilter>(
    initFilter || <AccountFilter>{},
  );
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
    async function fetchAccounts() {
      const params = new URLSearchParams({
        search: filter?.search || "",
        page: filter?.page?.toString() || "1",
        limit: filter?.limit?.toString() || "10",
      });
      const res = await fetch(`/api/accounts?${params.toString()}`);
      const data = await res.json();
      setAccounts(data);
    }
    fetchAccounts();
  }, [filter]);

  return {
    accounts,
    filter,
    setFilter,
  };
}
