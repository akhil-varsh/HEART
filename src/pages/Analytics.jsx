import { useState, useEffect } from 'react';
import TrendAnalysis from '../components/analytics/TrendAnalysis';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data - replace with API calls
const mockData = {
  predictions: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
    predicted: Math.floor(Math.random() * 1000),
    actual: i === 0 ? Math.floor(Math.random() * 1000) : undefined,
  })),
  trends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    cases: Math.floor(Math.random() * 1000),
    casesTrend: Math.floor(Math.random() * 1000),
    rate: Math.random() * 5,
    rateTrend: Math.random() * 5,
    severity: Math.random() * 10,
    severityTrend: Math.random() * 10,
  })),
};

export default function Analytics() {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // Replace with actual API call
    setData(mockData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Disease Outbreak Prediction</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="actual" fill="#0ea5e9" name="Actual Cases" />
              <Bar dataKey="predicted" fill="#94a3b8" name="Predicted Cases" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Trend Analysis</h2>
        <TrendAnalysis data={data.trends} />
      </div>
    </div>
  );
}