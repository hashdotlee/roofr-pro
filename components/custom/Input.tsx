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
  disabled,
  name,
}: {
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  control: Control<any>;
  name: string;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", containerClassName)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              id={name}
              className={cn("w-[200px] justify-between", inputClassName)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
