import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import { Textarea } from "../ui/textarea";

export default function CustomTextArea({
  label,
  placeholder,
  inputClassName,
  containerClassName,
  control,
  disabled,
  row,
  cols,
  name,
  onTextChange,
}: {
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  control: Control<any>;
  name: string;
  row?: number;
  cols?: number;
  onTextChange?: (value: string) => void;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", containerClassName)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              rows={row}
              cols={cols}
              placeholder={placeholder}
              disabled={disabled}
              id={name}
              className={cn("w-[200px] justify-between", inputClassName)}
              {...(onTextChange && {
                onChange: (e) => onTextChange(e.target.value),
              })}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
