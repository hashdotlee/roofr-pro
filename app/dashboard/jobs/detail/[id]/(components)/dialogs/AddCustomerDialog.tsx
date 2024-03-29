import { createCustomer, updateCustomer } from "@/actions/customer";
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
import { useCustomers } from "@/hooks/useCustomers";
import useJob from "@/hooks/useJob";
import { useUpdateJob } from "@/hooks/useUpdateJob";
import { zodResolver } from "@hookform/resolvers/zod";
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
  phone: z
    .string()
    .regex(
      /^([0-9]{3}|[0-9]{3}–)([0-9]{3}|[0-9]{3}–)[0-9]{4}$/,
      "Phone number must be 10 digits",
    )
    .optional(),
  ssn: z
    .string()
    .regex(/^[0-9]{4}$/, "SSN must be 4 digits")
    .optional()
    .or(z.literal("")),
});

const AddCustomerModal = ({ children }: { children: ReactNode }) => {
  const jobId = useParams().id as string;
  const { data: customers = [], filter, setFilter } = useCustomers();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { data: job } = useJob(jobId);

  const [open, setOpen] = useState(false);

  const { mutate: updateJob } = useUpdateJob({
    jobId,
  });

  useEffect(() => {
    if (job?.customer) {
      form.reset({
        name: job?.customer?.fullname,
        email: job?.customer?.email,
        phone: job?.customer?.phone,
        ssn: job?.customer?.ssn?.toString(),
      });
      setIsDisabled(false);
    }
  }, [job]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const customer = customers.find(
      (customer) => customer._id.toString() === data.name,
    );
    if (job?.customer) {
      updateCustomer({
        id: job?.customer?._id,
        customerPayload: {
          fullname: data.name,
          email: data.email,
          phone: data.phone,
          ssn: data.ssn,
        },
      });
    } else {
      if (customer) {
        updateJob({
          job: {
            customer: customer._id as any,
          },
        });
      } else {
        const res = await createCustomer({
          customer: {
            fullname: data.name,
            email: data.email,
            phone: data.phone,
            ssn: data.ssn,
          },
        });
        updateJob({
          job: {
            customer: res.data._id,
          },
        });
      }
    }
    toast.success("Customer updated successfully");
    setOpen(false);
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
                  form.setValue("ssn", customer.ssn?.toString() || "");
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
              format={`###–###–####`}
              disabled={isDisabled}
              placeholder="Phone"
            />
            <CustomInput
              name="ssn"
              label="SSN (4 digits)"
              inputClassName="w-full"
              disabled={isDisabled}
              format="####"
              control={form.control}
              placeholder="SSN"
              allowLeadingZeros
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

export default AddCustomerModal;
