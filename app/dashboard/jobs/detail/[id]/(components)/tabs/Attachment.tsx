import FileUploader from "@/components/custom/FileUpload";
import { Button } from "@/components/ui/button";

export default function Attachments() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">
            Attachments
        </div>
        <Button
          variant={"default"}
          className="rounded-full px-8 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-700 h-7"
        >
          Save
        </Button>
      </div>
      <FileUploader
        onChange={(file) => {
          console.log(file);
        }}
        object="proposal"
        value={["r353"]}
      />
    </div>
  );
}
