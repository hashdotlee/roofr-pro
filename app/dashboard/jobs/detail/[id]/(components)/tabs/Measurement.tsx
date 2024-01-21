import { Button } from "@/components/ui/button";

export default function Measurement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">
          Measurements
        </div>
        <Button
          variant={"default"}
          className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
