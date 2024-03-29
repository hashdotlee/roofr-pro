import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import { useNotes } from "@/hooks/useNote";

export default function NoteList() {
  const [content, setContent] = useState("");
  const jobId = useParams().id as string;
  const { data: notes = [], refetch } = useNotes(jobId);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setLoading(true);
    fetch(`/api/jobs/${jobId}/notes`, {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    }).then(() => {
      setLoading(false);
      setContent("");
      refetch();
    });
  };

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [notes]);

  return (
    <>
      <div className="flex overflow-y-auto flex-col gap-2">
        {notes.map((note: any) => (
          <NoteItem key={note?._id} note={note} />
        ))}
        <div className="h-1" />
        <div className="h-1" ref={bottomRef} />
      </div>
      <label htmlFor="add_note" className="relative mt-auto block">
        <Input
          id="add_note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add new note..."
          className="py-8"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEnter();
          }}
          disabled={loading}
        />
        <Button
          className=" absolute rounded-none right-4 text-blue-700 top-1/2 bg-transparent hover:bg-transparent p-0 -translate-y-1/2"
          onClick={handleEnter}
        >
          <SendIcon className="w-5 h-5" />
        </Button>
      </label>
    </>
  );
}
