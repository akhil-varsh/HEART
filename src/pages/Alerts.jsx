import { useState } from 'react';

export default function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'System Maintenance',
      priority: 'high',
      status: 'open',
      message: 'Maintenance scheduled for midnight.',
      createdAt: new Date().toISOString(),
      notifications: [],
      responses: [],
    },
    {
      id: 2,
      title: 'Security Alert',
      priority: 'medium',
      status: 'in_progress',
      message: 'Suspicious login attempt detected.',
      createdAt: new Date().toISOString(),
      notifications: [],
      responses: [],
    },
  ]);

  const [newAlert, setNewAlert] = useState({
    title: '',
    priority: 'medium',
    status: 'open',
    message: '',
  });

  const [notifications] = useState([
    { id: 101, type: 'info', message: 'System backup completed', timestamp: new Date().toISOString() },
    { id: 102, type: 'warning', message: 'High CPU usage detected', timestamp: new Date().toISOString() },
  ]);

  const [responses] = useState([
    { id: 201, alertId: 1, user: 'Alice', response: 'Restarting server', timestamp: new Date().toISOString() },
    { id: 202, alertId: 2, user: 'Bob', response: 'Investigating logs', timestamp: new Date().toISOString() },
  ]);

  const [healthAlerts, setHealthAlerts] = useState([]);

  const handleCreateAlert = () => {
    setAlerts((prev) => [
      ...prev,
      {
        ...newAlert,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        notifications: [],
        responses: [],
      },
    ]);
    setNewAlert({ title: '', priority: 'medium', status: 'open', message: '' });
  };

  const updateAlertStatus = (id, status) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, status } : alert))
    );
  };

  const createHealthAlert = () => {
    setHealthAlerts([
      ...healthAlerts,
      {
        id: Date.now(),
        title: 'Heart Rate Alert',
        priority: 'high',
        status: 'open',
        message: 'Patient heart rate is elevated',
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Alerts Management</h1>

      {/* Alert Creation Interface */}
      <div className="card p-4 space-y-4">
        <h2 className="text-lg font-medium">Create New Alert</h2>
        <div className="flex flex-col gap-2">
          <input
            className="p-2 rounded border shadow-sm focus:outline-none"
            placeholder="Alert Title"
            value={newAlert.title}
            onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
          />
          <textarea
            className="p-2 rounded border shadow-sm focus:outline-none"
            placeholder="Alert Message"
            value={newAlert.message}
            onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
          />
          <div className="flex items-center gap-2">
            <select
              className="p-2 rounded border shadow-sm focus:outline-none"
              value={newAlert.priority}
              onChange={(e) => setNewAlert({ ...newAlert, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              className="p-2 rounded border shadow-sm focus:outline-none"
              value={newAlert.status}
              onChange={(e) => setNewAlert({ ...newAlert, status: e.target.value })}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <button
            onClick={handleCreateAlert}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Create Alert
          </button>
        </div>
      </div>

      {/* Alert List and Status Tracking */}
      <div className="card p-4 space-y-4">
        <h2 className="text-lg font-medium">Alert Status Tracking</h2>
        {alerts.length === 0 ? (
          <p>No alerts yet.</p>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-2 py-1">Title</th>
                <th className="px-2 py-1">Priority</th>
                <th className="px-2 py-1">Status</th>
                <th className="px-2 py-1">Created</th>
                <th className="px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-b">
                  <td className="px-2 py-1">{alert.title}</td>
                  <td className="px-2 py-1 capitalize">{alert.priority}</td>
                  <td className="px-2 py-1 capitalize">{alert.status}</td>
                  <td className="px-2 py-1">
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>
                  <td className="px-2 py-1">
                    <button
                      onClick={() => updateAlertStatus(alert.id, 'open')}
                      className="mr-2 text-blue-600"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => updateAlertStatus(alert.id, 'in_progress')}
                      className="mr-2 text-green-600"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateAlertStatus(alert.id, 'closed')}
                      className="mr-2 text-red-600"
                    >
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Notification History */}
      <div className="card p-4 space-y-2">
        <h2 className="text-lg font-medium">Notification History</h2>
        {notifications.map((note) => (
          <div key={note.id} className="p-2 border-b">
            <p className="text-sm text-gray-800">
              <strong>{note.type.toUpperCase()}:</strong> {note.message}{' '}
              <span className="text-gray-500">
                ({new Date(note.timestamp).toLocaleString()})
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Response Tracking */}
      <div className="card p-4 space-y-2">
        <h2 className="text-lg font-medium">Response Tracking</h2>
        {responses.map((resp) => (
          <div key={resp.id} className="p-2 border-b">
            <p className="text-sm text-gray-800">
              Alert #{resp.alertId} - <strong>{resp.user}:</strong> {resp.response}{' '}
              <span className="text-gray-500">
                ({new Date(resp.timestamp).toLocaleString()})
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Health Alerts */}
      <div className="card p-4 space-y-2">
        <h2 className="text-lg font-medium">Health Alerts</h2>
        <button
          onClick={() => createHealthAlert()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Create Health Alert
        </button>
        {healthAlerts.map((alert) => (
          <div key={alert.id} className="mt-2">
            <p>{alert.title}: {alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}