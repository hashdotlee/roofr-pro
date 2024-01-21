"use client";

import NewJobDialog from "@/app/dashboard/jobs/(components)/NewJobDialog";
import { ComposeMode } from "@/dtos/compose-customer.dto";
import { useCustomer } from "@/hooks/useCustomer";
import { useJobs } from "@/hooks/useJobs";
import { getTimeAgo } from "@/lib/utils";
import { useParams } from "next/navigation";
import CustomerForm from "../../_components/CustomerForm";
import DeleteCustomerDialog from "../../_components/DeleteCustomerDialog";

export default function EditCustomerPage() {
  const id = useParams().id as string;
  const { data: customer } = useCustomer(id);
  const { data: jobs } = useJobs({ customerId: id });
  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Customer</h2>
      <div className="flex flex-row gap-12 mt-4 justify-start items-start">
        <div className="w-[400px] space-y-2">
          <CustomerForm mode={ComposeMode.Edit} customer={customer} />
          <DeleteCustomerDialog customerId={id} />
        </div>
        <div className="w-[400px] space-y-2">
          <h3 className="font-semibold">Jobs</h3>
          {jobs?.map((job) => (
            <div
              key={job._id}
              className="space-y-1 rounded-md p-2 border shadow-sm bg-gray-50"
            >
              <div className="text-base font-semibold">{job.address}</div>
              <div className="text-xs">
                Created: {getTimeAgo(job?.createdAt)}
              </div>
              <div className="text-xs">
                Assigned to: {job?.assignee?.firstName}{" "}
                {job?.assignee?.lastName}
              </div>
            </div>
          ))}
          <div className="text-sm">
            There are no jobs associated with this customer.
          </div>
          <div className="mt-4"></div>
          <NewJobDialog customerId={id} />
        </div>
      </div>
    </div>
  );
}
