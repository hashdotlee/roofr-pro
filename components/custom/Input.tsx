import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import {
  InputAttributes,
  NumericFormatProps,
  PatternFormat,
} from "react-number-format";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CustomInputProps extends NumericFormatProps<InputAttributes> {
  label?: string;
  inputClassName?: string;
  containerClassName?: string;
  format?: string;
  mask?: string;
  control: Control<any>;
  name: string;
  onTextChange?: (value: string) => void;
}

export default function CustomInput({
  label,
  inputClassName,
  containerClassName,
  control,
  mask = "_",
  format = "",
  name,
  onTextChange,
  ...props
}: CustomInputProps) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", containerClassName)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {format ? (
              <PatternFormat
                {...field}
                id={name}
                format={format}
                mask={mask}
                className={cn(`
          flex h-10 w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          ${inputClassName}
        `)}
                {...(onTextChange && {
                  onChange: (e) => onTextChange(e.target.value),
                })}
                {...props}
              />
            ) : (
              <Input
                {...field}
                id={name}
                className={cn(`items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                ${inputClassName} `)}
                {...(onTextChange && {
                  onChange: (e) => onTextChange(e.target.value),
                })}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
