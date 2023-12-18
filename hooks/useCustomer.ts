import { Customer } from "@/models/Customer";
import { useEffect, useState } from "react";

interface CustomerFilter {
  search?: string;
  page?: number;
  limit?: number;
}

export const useCustomer = (initFilter?: CustomerFilter) => {
  const [filter, setFilter] = useState(initFilter);
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    async function fetchCustomers() {
      const params = new URLSearchParams({
        search: filter?.search || "",
        page: filter?.page?.toString() || "1",
        limit: filter?.limit?.toString() || "10",
      });
      const res = await fetch(`/api/customers?${params.toString()}`);
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, [filter]);
  return {
    customers,
    filter,
    setFilter,
  };
};
