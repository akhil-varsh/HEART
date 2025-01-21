import { useState, useEffect } from 'react';
import RiskMap from '../components/monitoring/RiskMap';

// Mock data - replace with API calls
const mockMapData = [
  { lat: 40.7128, lng: -74.0060, risk: 'high', location: 'New York', cases: 500 },
  { lat: 51.5074, lng: -0.1278, risk: 'medium', location: 'London', cases: 300 },
  { lat: 35.6762, lng: 139.6503, risk: 'low', location: 'Tokyo', cases: 100 },
];

export default function Monitoring() {
  const [mapData, setMapData] = useState(mockMapData);

  useEffect(() => {
    // Replace with actual API call
    setMapData(mockMapData);
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Risk Distribution</h2>
        <RiskMap data={mapData} />
      </div>
    </div>
  );
}