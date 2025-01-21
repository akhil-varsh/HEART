import { useState } from 'react';
import { BellIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const getAlertIcon = (severity) => {
  switch (severity) {
    case 'high':
      return <ExclamationTriangleIcon className="h-5 w-5 text-risk-high" />;
    case 'medium':
      return <BellIcon className="h-5 w-5 text-risk-medium" />;
    default:
      return <InformationCircleIcon className="h-5 w-5 text-primary-500" />;
  }
};

export default function AlertList({ alerts }) {
  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter(
    alert => filter === 'all' || alert.severity === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`btn ${filter === 'all' ? 'btn-primary' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('high')}
          className={`btn ${filter === 'high' ? 'bg-risk-high text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          High Priority
        </button>
        <button
          onClick={() => setFilter('medium')}
          className={`btn ${filter === 'medium' ? 'bg-risk-medium text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Medium Priority
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`btn ${filter === 'low' ? 'bg-risk-low text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Low Priority
        </button>
      </div>
      <div className="space-y-2">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            {getAlertIcon(alert.severity)}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{alert.title}</h4>
              <p className="text-sm text-gray-600">{alert.message}</p>
              <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
                <span>•</span>
                <span>{alert.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}