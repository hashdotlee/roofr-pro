import { createCustomer } from "@/actions/customer";
import { updateJob } from "@/actions/job";
import CustomComboBox from "@/components/custom/ComboBox";
import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useCustomer } from "@/hooks/useCustomer";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Please select a customer.",
  }),
  email: z.string().email({
    message: "Please enter a email.",
  }),
  phone: z.string(),

  ssn: z.string(),
});

export const AddCustomerModal = () => {
  const jobId = useParams().id as string;
  const { customers, filter, setFilter } = useCustomer();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const customer = customers.find(
      (customer) => customer._id.toString() === data.name,
    );
    if (customer) {
      updateJob(jobId, {
        customerId: customer._id,
      });
    } else {
      await createCustomer({
        fullname: data.name,
        email: data.email,
        phone: data.phone,
        ssn: data.ssn,
      }).then((res) => {
        updateJob(jobId, {
          customerId: res.data._id,
        });
      });
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-gray-100 text-current hover:bg-gray-200 flex items-center gap-2 text-xs px-4 py-2">
          <UserPlus className="w-4 h-4" /> Add Customer
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="text-2xl mx-auto font-semibold my-4 text-center">
          <DialogTitle>Customer Detail</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CustomComboBox
              name="name"
              label="Name"
              contentClassName="w-[calc(100vw-3rem)] max-w-md"
              selectClassName="max-w-md w-full"
              onValueChange={(value) => {
                const customer = customers.find(
                  (customer) => customer._id.toString() === value,
                );
                if (customer) {
                  form.setValue("email", customer.email || "");
                  form.setValue("phone", customer.phone || "");
                  form.setValue("ssn", customer.ssn || "");
                  setIsDisabled(true);
                } else {
                  setIsDisabled(false);
                  form.setValue("email", "");
                  form.setValue("phone", "");
                  form.setValue("ssn", "");
                }
              }}
              control={form.control}
              inputValue={filter?.search}
              onInputChange={(value) => {
                setFilter({
                  ...filter,
                  search: value,
                });
              }}
              placeholder="Search customer"
              options={
                customers.map((customer) => ({
                  label: customer.fullname,
                  value: customer._id.toString(),
                })) || []
              }
            />
            <CustomInput
              name="email"
              label="Email (optional)"
              inputClassName="w-full"
              control={form.control}
              disabled={isDisabled}
              placeholder="Email"
            />

            <CustomInput
              name="phone"
              label="Phone (optional)"
              inputClassName="w-full"
              control={form.control}
              disabled={isDisabled}
              placeholder="Phone"
            />

            <CustomInput
              name="ssn"
              label="SSN Number"
              inputClassName="w-full"
              control={form.control}
              disabled={isDisabled}
              placeholder="SSN Number"
            />

            <Button type="submit" className="w-full mt-3">
              Add customer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
