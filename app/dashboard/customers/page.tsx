"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ComposeCustomerDTO,
  toComposeCustomerDTO,
} from "@/dtos/compose-customer.dto";

export default function Customers() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<ComposeCustomerDTO[]>([]);
  const pathname = usePathname();

  const fetchCustomers = async () => {
    const res = await fetch("/api/customers", {});
    const data = await res.json();
    setCustomers(data.map(toComposeCustomerDTO));
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (pathname === "/dashboard/customers") {
      fetchCustomers();
    }
  }, [pathname]);

  return (
    <div className="h-screen w-full py-8 px-8 overflow-x-hidden">
      <div className="flex items-center justify-between">
        <Label className="flex items-center border px-4 focus-visible:ring-transparent rounded-md bg-white">
          <Search className="w-4 h-4" />
          <Input placeholder="Search customer" className="border-0" />
        </Label>
        <Button
          className="gap-2"
          onClick={() => router.push(`/dashboard/customers/new`)}
        >
          <PlusCircle /> Add Customer
        </Button>
      </div>
      <div className="mt-8 rounded-xl border-2 border-gray-300">
        <Table>
          <TableHeader>
            <TableRow className="border-b-gray-400">
              <TableHead>Customer Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No customers found.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer, index) => (
                <CustomerRow {...customer} key={index} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CustomerRow({
  _id,
  fullname,
  phone,
  email,
  createdOn,
}: ComposeCustomerDTO) {
  const router = useRouter();

  return (
    <TableRow
      className="cursor-pointer text-base"
      onClick={() => router.push(`/dashboard/customers/${_id}/edit`)}
    >
      <TableCell className="font-bold">{fullname || "N/A"}</TableCell>
      <TableCell>{phone || "N/A"}</TableCell>
      <TableCell>{email || "N/A"}</TableCell>
      <TableCell>{createdOn || "N/A"}</TableCell>
    </TableRow>
  );
}
