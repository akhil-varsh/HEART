import { useState } from 'react';
import { DocumentIcon, TableCellsIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function ReportBuilder({ onGenerate }) {
  const [sections, setSections] = useState([]);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    dateRange: 'last7days',
    format: 'pdf'
  });

  const availableSections = [
    { id: 'summary', name: 'Executive Summary', icon: DocumentIcon },
    { id: 'cases', name: 'Case Statistics', icon: TableCellsIcon },
    { id: 'trends', name: 'Trend Analysis', icon: ChartBarIcon },
    { id: 'map', name: 'Geographic Distribution', icon: TableCellsIcon },
    { id: 'predictions', name: 'Predictive Insights', icon: ChartBarIcon }
  ];

  const handleSectionToggle = (sectionId) => {
    setSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Report Title</label>
          <input
            type="text"
            value={reportConfig.title}
            onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Enter report title"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <select
            value={reportConfig.dateRange}
            onChange={(e) => setReportConfig(prev => ({ ...prev, dateRange: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="lastQuarter">Last Quarter</option>
            <option value="lastYear">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Report Sections</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionToggle(section.id)}
                className={`flex items-center space-x-2 p-4 rounded-lg border ${
                  sections.includes(section.id)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <section.icon className="h-5 w-5 text-gray-500" />
                <span>{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => onGenerate({ ...reportConfig, sections })}
          disabled={!reportConfig.title || sections.length === 0}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}