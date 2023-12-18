import Image from "next/image";

interface NoteItemDTO {
  _id: string;
  content: string;
  writer?: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}
interface NoteItemProps {
  note: NoteItemDTO;
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-sm">
          <div className="flex items-center gap-2">
            <Image
              src={note?.writer?.avatar || "/default_avatar.svg"}
              alt="Picture of the author"
              width={24}
              height={24}
            />
            {note?.writer?.firstName && note?.writer?.lastName ? (
              <span className="mr-2 text-xs">{`${note?.writer?.firstName} ${note?.writer?.lastName}`}</span>
            ) : (
              <span className="mr-2 text-xs">Unknown</span>
            )}
          </div>
        </div>
        <div className="text-xs text-neutral-500">Today at 10:00 AM</div>
      </div>
      <div className="text-xs mt-3">{note.content}</div>
    </div>
  );
}
