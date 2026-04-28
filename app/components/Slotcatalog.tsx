export default function Slotcatalog() {
  const items = [
    {
      label: "Available",
      color: "bg-white border-gray-400",
    },
    {
      label: "Booked",
      color: "bg-gray-200 border-gray-400",
    },
    {
      label: "Selected",
      color: "bg-green-500 border-green-500",
    },
    {
      label: "Maintenance",
      color: "bg-red-200 border-red-500",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <span
            className={`w-4 h-4 rounded-full border-2 ${item.color} shadow-sm`}
          />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}