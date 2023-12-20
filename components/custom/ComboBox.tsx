import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

export default function CustomComboBox({
  options,
  control,
  name,
  label,
  description,
  selectClassName,
  inputValue,
  contentClassName,
  onInputChange,
  onValueChange,
  placeholder,
}: {
  control: Control<any>;
  options: {
    label: string;
    value: string;
  }[];
  name: string;
  label: string;
  description?: string;
  selectClassName?: string;
  onInputChange?: (value: string) => void;
  inputValue?: string;
  contentClassName?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground mt-2",
                    selectClassName
                  )}
                >
                  {field.value
                    ? options?.find((option) => option.value === field.value)
                        ?.label ?? field.value
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("p-2 border", contentClassName)}>
              <div>
                <Input
                  placeholder={placeholder}
                  className="border-0 border-b focus-visible:ring-0 rounded-none"
                  value={inputValue}
                  onChange={(e) => {
                    onInputChange && onInputChange(e.target.value);
                  }}
                />
                <div>
                  {options.map((option) => (
                    <Button
                      type="button"
                      value={option.label}
                      key={option.value}
                      onClick={() => {
                        field.onChange(option.value);
                        onValueChange && onValueChange(option.value);
                        setOpen(false);
                      }}
                      className="w-full justify-start border-0 text-left bg-transparent hover:bg-gray-100 rounded-none text-current"
                    >
                      <Check
                        className={cn(
                          "mr-2 grow-0 shrink-0 h-4 w-4",
                          option.value === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </Button>
                  ))}
                  {inputValue && (
                    <Button
                      type="button"
                      onClick={() => {
                        field.onChange(inputValue);
                        onValueChange && onValueChange(inputValue);
                        setOpen(false);
                      }}
                      className="w-full justify-start border-0 text-left bg-transparent hover:bg-gray-100 rounded-none text-current"
                    >
                      <Plus className={cn("mr-2 grow-0 shrink-0 h-4 w-4")} />
                      Add {inputValue}
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
