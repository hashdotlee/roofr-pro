import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAccounts from "@/hooks/useAccount";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Control } from "react-hook-form";

export default function AssigneePopover({
  placeholder = "Assignee",
  control,
  name,
  label,
}: {
  placeholder?: string;
  control: Control<any>;
  name: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const { accounts, filter, setFilter } = useAccounts();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col w-full">
            {label && <FormLabel className="w-full">{label}</FormLabel>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full truncate px-3 py-2 pl-4"
                >
                  {field.value ? (
                    <>
                      <Image
                        src={field.value?.avatar || "/default_avatar.svg"}
                        alt={"avatar"}
                        width={18}
                        height={18}
                        className="rounded-full mr-4"
                      />
                      <span className="text-sm w-full truncate text-left">
                        {field.value?.firstName} {field.value?.lastName}
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="mr-2 h-4 w-4" />
                      <span className="text-sm">{placeholder}</span>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-[245px]">
                <Input
                  className="w-full focus-visible:ring-0"
                  placeholder="Search users"
                  value={filter.search}
                  onChange={(e) =>
                    setFilter({ ...filter, search: e.target.value })
                  }
                />
                <hr className="my-2" />
                <div className="flex flex-col gap-2">
                  {accounts.map((account) => (
                    <Button
                      variant="outline"
                      key={account._id.toString()}
                      className="justify-start"
                      onClick={() => {
                        field.onChange(account);
                        setOpen(false);
                      }}
                    >
                      <Image
                        src={account.avatar || "/default_avatar.svg"}
                        alt={"avatar"}
                        width={24}
                        height={24}
                        className="rounded-full mr-2"
                      />
                      {account.firstName} {account.lastName}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </FormItem>
        );
      }}
    />
  );
}
