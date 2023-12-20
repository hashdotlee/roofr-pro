export default function Proposal() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold leading-3 text-left">Proposal</div>
      <div className="flex items-center gap-3">
        <button
          disabled
          className="flex items-center gap-1 px-4 py-2 rounded-full text-xs text-white bg-blue-500 font-semibold"
        >
          Create Proposal
        </button>
      </div>
    </div>
  );
}
