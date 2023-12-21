import { format } from "date-fns";
import { ShieldCheck, SquareUser, User } from "lucide-react";
import Image from "next/image";

interface NoteItemDTO {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    role: string;
  };
}
interface NoteItemProps {
  note: NoteItemDTO;
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <Image
              src={note?.writer?.avatar || "/default_avatar.svg"}
              alt="Picture of the author"
              width={24}
              height={24}
            />
            <div className="flex items-center">
              {note?.writer?.firstName && note?.writer?.lastName ? (
                <span className="mr-2 text-xs font-semibold ">{`${note?.writer?.firstName} ${note?.writer?.lastName}`}</span>
              ) : (
                <span className="mr-2 text-xs font-semibold">Unknown</span>
              )}
              {note?.writer?.role === "admin" ? (
                <span
                  title="Admin"
                  className="text-xs font-semibold text-neutral-500"
                >
                  <ShieldCheck size={12} className="inline-block mr-1" />
                </span>
              ) : (
                <span title="Contractor">
                  <User size={12} className="inline-block mr-1" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-xs text-neutral-500">
          {note?.createdAt ? format(new Date(note?.createdAt), "Pp") : ""}
        </div>
      </div>
      <div className="text-xs mt-3">{note.content}</div>
    </div>
  );
}
