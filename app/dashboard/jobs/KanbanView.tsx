export default function KanbanView() {
  return (
    <div className="overflow-scroll mt-8 -mx-8 pl-8">
      <div className="flex flex-row gap-3 h-[calc(100vh-12rem)]">
        {Array.from({ length: 8 }).map((_, i) => (
          <KanbanTab key={i} />
        ))}
      </div>
    </div>
  );
}

function KanbanTab() {
  return (
    <div className="flex flex-col grow-0 shrink-0 w-[300px] bg-slate-300"></div>
  );
}
