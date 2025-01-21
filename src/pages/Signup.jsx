// src/pages/Signup.jsx
import { useState } from 'react';

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="card w-full max-w-md space-y-6">
        <h2 className="text-xl font-medium text-gray-900">Sign up</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            // Replace with actual signup logic
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}