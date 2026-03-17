export default function TaskCard({ task }: any) {
  return (
    <div className="border p-3 rounded mb-2">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <span className="text-xs">{task.status}</span>
    </div>
  );
}
