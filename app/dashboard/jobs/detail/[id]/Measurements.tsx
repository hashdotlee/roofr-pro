export default function Measurement() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold leading-3 text-left">
        Measurements
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 px-4 py-2 rounded-full text-xs bg-gray-200 font-semibold">
          Create DIY report
        </div>
        <div className="flex items-center gap-1 px-4 py-2 rounded-full text-xs text-white bg-blue-500 font-semibold">
          Order Report
        </div>
      </div>
    </div>
  );
}
