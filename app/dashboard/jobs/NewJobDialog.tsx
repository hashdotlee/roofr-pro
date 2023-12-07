import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { NewJobForm } from "./_components/NewJobForm";

export default function NewJobDialog() {
  return (
    <Dialog>
      <DialogTrigger className="py-3 px-4 bg-primary text-white flex items-center gap-2 rounded-3xl font-semibold">
        <FaPlus className="w-4 h-4 pr-1" />
        <span className="text-sm">New Job</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-2xl mx-auto font-semibold my-4 text-center">
          New Job
        </DialogHeader>
        <NewJobForm />
      </DialogContent>
    </Dialog>
  );
}
