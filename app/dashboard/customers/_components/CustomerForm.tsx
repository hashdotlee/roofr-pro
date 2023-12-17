"use client";

import { createCustomer, updateCustomer } from "@/actions/customer";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import validator from "validator";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { ComposeCustomerDTO } from "@/dtos/compose-customer.dto";
import { ComposeMode } from "@/dtos/compose-customer.dto";

const formSchema = z.object({
  fullname: z.string().min(1, "Please provide customer's name."),
  email: z
    .string()
    .email("This is not a valid email. Please try again.")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .refine(validator.isMobilePhone, "This is not a valid phone number.")
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
    },
    mode: "onBlur",
  });
  const { formState } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    if (mode === ComposeMode.Create) {
      await onCreate(values);
    } else {
      await onEdit(values);
    }
  }

  async function onCreate(values: z.infer<typeof formSchema>) {
    const res = await createCustomer(values);
    if (!res.ok) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      form.reset();
    }
  }

  async function onEdit(values: z.infer<typeof formSchema>) {
    if (!customer?._id) return;
    const res = await updateCustomer(customer?._id, values);
    if (!res.ok) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone" {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
