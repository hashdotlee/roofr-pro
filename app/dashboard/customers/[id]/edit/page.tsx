import CustomerForm from "../../_components/CustomerForm";
import NewJobDialog from "@/app/dashboard/jobs/(components)/NewJobDialog";
import DeleteCustomerDialog from "../../_components/DeleteCustomerDialog";
import { ComposeMode } from "@/dtos/compose-customer.dto";

export default async function EditCustomerPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customers/${id}`);
  const customer = await res.json();

  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit Customer</h2>
      <div className="flex flex-row gap-12 mt-4 justify-start items-start">
        <div className="w-[400px] space-y-2">
          <CustomerForm mode={ComposeMode.Edit} customer={customer} />
          <DeleteCustomerDialog customerId={id} />
        </div>
        <div className="w-[400px]">
          <h3 className="font-semibold">Jobs</h3>
          <span>There are no jobs associated with this customer.</span>
          <div className="mt-4"></div>
          <NewJobDialog />
        </div>
      </div>
    </div>
  );
}
