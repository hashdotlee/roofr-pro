import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";

export default function CustomInput({
  label,
  placeholder,
  inputClassName,
  containerClassName,
  control,
  type,
  disabled,
  name,
  onTextChange,
}: {
  label?: string;
  placeholder?: string;
  inputClassName?: string;
  containerClassName?: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  control: Control<any>;
  name: string;
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
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              id={name}
              className={cn("w-[200px] justify-between", inputClassName)}
              {...(onTextChange && {
                onChange: (e) => onTextChange(e.target.value),
              })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
