"use client";

import CustomInput from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComposeCustomerDTO, ComposeMode } from "@/dtos/compose-customer.dto";
import useCreateCustomer from "@/hooks/useCreateCustomer";
import { useUpdateCustomer } from "@/hooks/useUpdateCustomer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullname: z.string().min(1, {
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

export default function CustomerForm({
  mode,
  customer,
}: {
  mode: ComposeMode;
  customer?: ComposeCustomerDTO;
}) {
  if (mode !== ComposeMode.Edit) customer = undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: mode === ComposeMode.Create ? "" : customer?.fullname,
      ...(mode === ComposeMode.Edit && { email: customer?.email }),
      ...(mode === ComposeMode.Edit && { phone: customer?.phone }),
      ...(mode === ComposeMode.Edit && { ssn: customer?.ssn }),
    },
    mode: "onBlur",
  });
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (mode === ComposeMode.Create) {
      await onCreate(values);
    } else {
      await onEdit(values);
    }
  }

  const router = useRouter();

  const { mutateAsync: createCustomer } = useCreateCustomer();
  const { mutateAsync: updateCustomer } = useUpdateCustomer({
    customerId: customer?._id!,
  });

  async function onCreate(values: z.infer<typeof formSchema>) {
    await createCustomer({ customer: values });
    form.reset();
  }

  async function onEdit(values: z.infer<typeof formSchema>) {
    if (!customer?._id) return;
    await updateCustomer({ customer: values });
    router.back();
  }

  useEffect(() => {
    if (customer && mode === ComposeMode.Edit) {
      form.reset(customer);
    }
  }, [customer]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CustomInput
          name="phone"
          label="Phone (optional)"
          inputClassName="w-full"
          control={form.control}
          format={`###–###–####`}
          placeholder="Phone"
        />
        <CustomInput
          name="ssn"
          label="SSN (4 digits)"
          inputClassName="w-full"
          format="####"
          control={form.control}
          placeholder="SSN"
          allowLeadingZeros
        />

        <Button
          type="submit"
          className="w-full"
          disabled={formState.isSubmitting || !formState.isValid}
        >
          <>
            {formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2 w-4" />
            )}
            {formState.isSubmitting ? "Saving..." : "Save"}
          </>
        </Button>
      </form>
    </Form>
  );
}
