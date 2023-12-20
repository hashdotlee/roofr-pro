export default function Measurement() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold leading-3 text-left">
        Measurements
      </div>
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1 px-4 py-2 rounded-full text-xs bg-gray-200 font-semibold"
          disabled
        >
          Create DIY report
        </button>
        <button
          className="flex items-center gap-1 px-4 py-2 rounded-full text-xs text-white bg-blue-500 font-semibold"
          disabled
        >
          Order Report
        </button>
      </div>
    </div>
  );
}
