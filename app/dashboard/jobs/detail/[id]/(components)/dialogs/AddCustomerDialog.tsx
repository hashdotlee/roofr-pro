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
import useJob from "@/hooks/useJob";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Please select a customer.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a email.",
    })
    .optional(),
  phone: z.string().optional(),

  ssn: z.string().optional(),
});

export const AddCustomerModal = ({ children }: { children: ReactNode }) => {
  const jobId = useParams().id as string;
  const { customers, filter, setFilter } = useCustomer();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { setJob, job } = useJob();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (job?.customer) {
      form.reset({
        name: job.customer.fullname,
        email: job.customer.email,
        phone: job.customer.phone,
        ssn: job.customer.ssn,
      });
      setIsDisabled(false);
    }
  }, [job]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const customer = customers.find(
      (customer) => customer._id.toString() === data.name,
    );
    try {
      if (customer) {
        await updateJob(jobId, {
          customer: customer._id as any,
        });
        setJob((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            customer: customer as any,
          };
        });
      } else {
        const res = await createCustomer({
          fullname: data.name,
          email: data.email,
          phone: data.phone,
          ssn: data.ssn,
        });
        await updateJob(jobId, {
          customer: res.data._id,
        });
        setJob((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            customer: res.data as any,
          };
        });
      }
      toast.success("Customer updated successfully");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
              label="SSN (4 digits)"
              inputClassName="w-full"
              control={form.control}
              disabled={isDisabled}
              placeholder="SSN"
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
