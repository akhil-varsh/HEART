import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from 'recharts';

export default function TrendAnalysis({ data }) {
  const [timeRange, setTimeRange] = useState('1w');
  const [metric, setMetric] = useState('cases');

  const ranges = {
    '1w': 'Last Week',
    '1m': 'Last Month',
    '3m': 'Last 3 Months',
    '1y': 'Last Year'
  };

  const metrics = {
    cases: 'Total Cases',
    rate: 'Growth Rate',
    severity: 'Severity Index'
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="space-x-2">
          {Object.entries(ranges).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTimeRange(key)}
              className={`btn ${timeRange === key ? 'btn-primary' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {Object.entries(metrics).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey={metric}
              fill="#bae6fd"
              stroke="#0ea5e9"
              fillOpacity={0.3}
            />
            <Line
              type="monotone"
              dataKey={`${metric}Trend`}
              stroke="#0c4a6e"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}