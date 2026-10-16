export default function SectionHeader({ title, action = 'See all' }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>
      {action && <button className="text-xs text-accent hover:underline">{action}</button>}
    </div>
  );
}
