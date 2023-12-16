"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useState } from "react";
import { AuthResponse, login } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import CustomAlert from "@/components/custom/CustomAlert";
import { Loader2 } from "lucide-react";

const passwordError = {
  length: {
    message: "Password must be 8-40 characters long.",
  },
};

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, passwordError.length)
    .max(40, passwordError.length),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | undefined>("");
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const res: AuthResponse | undefined = await login({
        email: values.email,
        password: values.password,
      });
      if (!res?.ok) throw res;
      toast({
        title: "Login Successful!",
        description: res.message,
        variant: "default",
      });
      setApiError(undefined);
      setTimeout(() => {
        router.push(`${pathname}/../dashboard`);
      }, 800);
    } catch (error: any) {
      setApiError(error?.message);
      toast({
        title: "Login Failed!",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {apiError && (
          <CustomAlert variant="destructive" description={apiError} />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  className="border-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  type="password"
                  {...field}
                  className="border-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex flex-row gap-2 items-center justify-center"
          disabled={loading}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
