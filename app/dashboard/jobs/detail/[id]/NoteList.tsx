import { Input } from "@/components/ui/input";
import NoteItem from "./NoteItem";
import { SendIcon } from "lucide-react";

export default function NoteList() {
  return (
    <div className="flex flex-col h-full gap-3">
      <NoteItem />
      <label htmlFor="add_note" className="mt-auto relative">
        <Input id="add_note" placeholder="Add new note..." className="py-8" />
        <SendIcon className="w-5 h-5 absolute right-4 text-blue-700 top-1/2 -translate-y-1/2" />
      </label>
    </div>
  );
}
