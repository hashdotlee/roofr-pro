export default function NoteItem() {
  return (
    <div className="p-4 bg-yellow-50 rounded-md">
      <div className="flex justify-between">
        <div className="font-semibold text-sm">
          Le Viet Hoang{" "}
          <span className="text-xs text-neutral-500 font-normal">
            add a note
          </span>
        </div>
        <div className="text-xs text-neutral-500">Today at 10:00 AM</div>
      </div>
      <div className="text-xs mt-3">Note content</div>
    </div>
  );
}
