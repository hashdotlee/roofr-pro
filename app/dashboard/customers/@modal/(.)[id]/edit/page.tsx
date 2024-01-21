"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import EditCustomerPage from "../../../[id]/edit/page";

export default function CreateCustomerModal() {
  const router = useRouter();
  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent className="max-w-[60vw] max-h-[70vh] overflow-y-auto flex flex-col">
        <DialogHeader>
          <DialogClose className="mb-3" />
        </DialogHeader>
        <EditCustomerPage />
      </DialogContent>
    </Dialog>
  );
}
