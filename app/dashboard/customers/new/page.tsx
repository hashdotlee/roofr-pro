import CustomerForm from "../_components/CustomerForm";

export default function CreateCustomerPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">New Customer</h2>
      <div className="flex flex-row gap-12 mt-4 justify-start items-start">
        <div className="w-[400px]">
          <CustomerForm />
        </div>
        <div className="w-[400px]">
          <h3 className="font-semibold">Jobs</h3>
          <span>There are no jobs associated with this customer.</span>
        </div>
      </div>
    </div>
  );
}
