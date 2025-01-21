export default function StatCard({ title, value, change, type }) {
  const isPositive = change > 0;
  const changeColor = type === 'cases' 
    ? (isPositive ? 'text-risk-high' : 'text-risk-low')
    : (isPositive ? 'text-risk-low' : 'text-risk-high');

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        <p className={`ml-2 flex items-baseline text-sm font-semibold ${changeColor}`}>
          {isPositive ? '+' : ''}{change}%
        </p>
      </div>
    </div>
  );
}