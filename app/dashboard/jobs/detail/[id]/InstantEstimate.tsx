export default function InstantEstimate() {
  const metrics = [
    {
      name: "Roof footprint area (sqft)",
      value: "0",
    },
    {
      name: "Pitch",
      value: "0",
    },
    {
      name: "Roof area adjusted for pitch (sqft)",
      value: "0",
    },
    {
      name: "Currently on roof",
      value: "0",
    },
    {
      name: "Desired material",
      value: "0",
    },
    {
      name: "Project timeline",
      value: "0",
    },
    {
      name: "Residential / Commercial",
      value: "0",
    },
    {
      name: "Wants financing?",
      value: "0",
    },
    {
      name: "Customer Note",
      value: "0",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold leading-3 text-left">
          Instant Estimate
        </div>
        <div className="py-2 px-4 rounded-full bg-white text-blue-500 text-sm font-semibold">
          Edit
        </div>
      </div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4 mt-4 grid-cols-1">
        {metrics.map((metric) => (
          <div className="text-sm font-semibold">
            <div className="text-gray-500 my-1">{metric.name}</div>
            <div>{metric.value}</div>
          </div>
        ))}
      </div>
    </>
  );
}
