import { Select } from "@radix-ui/react-select";
import { Control, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

export default function CustomSelect({
  options,
  control,
  side,
  name,
  label,
  placeholder,
  selectClassName,
}: {
  control: Control<any>;
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  label?: string;
  side?: "left" | "right" | "top" | "bottom";
  placeholder?: string;
  selectClassName?: string;
}) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className={cn(selectClassName)}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent side={side}>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
