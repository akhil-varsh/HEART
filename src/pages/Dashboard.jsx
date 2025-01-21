import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AlertList from '../components/alerts/AlertList';

// Mock data - replace with API calls
const mockData = {
  stats: [
    { title: 'Active Cases', value: '2,345', change: 12, type: 'cases' },
    { title: 'Recovery Rate', value: '85%', change: 3, type: 'recovery' },
    { title: 'Risk Level', value: 'Moderate', change: -5, type: 'risk' },
    { title: 'Predictions', value: '+12%', change: 25, type: 'predictions' },
  ],
  trendData: [
    { date: '2024-01', cases: 65, predictions: 70, threshold: 75 },
    { date: '2024-02', cases: 72, predictions: 78, threshold: 75 },
    { date: '2024-03', cases: 80, predictions: 85, threshold: 75 },
  ],
  alerts: [
    {
      id: 1,
      title: 'High Case Surge Detected',
      message: 'Unusual increase in cases detected in New York area',
      severity: 'high',
      timestamp: '2024-02-20T10:30:00',
      location: 'New York, USA'
    },
    {
      id: 2,
      title: 'New Variant Identified',
      message: 'New disease variant identified in London region',
      severity: 'medium',
      timestamp: '2024-02-20T09:15:00',
      location: 'London, UK'
    },
    {
      id: 3,
      title: 'Recovery Rate Improving',
      message: 'Recovery rate shows positive trend in Tokyo',
      severity: 'low',
      timestamp: '2024-02-20T08:45:00',
      location: 'Tokyo, Japan'
    }
  ]
};

export default function Dashboard() {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // Replace with actual API call
    setData(mockData);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">EpiSense Dashboard</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-risk-high text-white rounded-lg hover:bg-risk-high/90 transition-colors">
          <AlertTriangle size={20} />
          <span>Active Alerts ({data.alerts.length})</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Disease Trend Analysis</h2>
          <div className="h-[400px]">
  <ResponsiveContainer width="100%" height={350}>
    <LineChart data={data.trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="cases" stroke="#0ea5e9" name="Actual Cases" />
      <Line type="monotone" dataKey="predictions" stroke="#22c55e" name="Predicted Cases" />
      <Line type="monotone" dataKey="threshold" stroke="#ef4444" name="Alert Threshold" strokeDasharray="3 3" />
    </LineChart>
  </ResponsiveContainer>
</div>
        </div>

        {/* Alerts Section */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Alerts</h2>
          <AlertList alerts={data.alerts} />
        </div>
      </div>
    </div>
  );
}