import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function CustomInput({
  label,
  placeholder,
  inputClassName,
  containerClassName,
  control,
  name,
}: {
  label: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  control: Control<any>;
  name: string;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", containerClassName)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className={cn("w-[200px] justify-between", inputClassName)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
