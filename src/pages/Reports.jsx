import { useState } from 'react';
import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import ReportBuilder from '../components/reports/ReportBuilder';

export default function Reports() {
  const [reportType, setReportType] = useState('daily');

  const generatePDF = (config) => {
    const doc = new jsPDF();
    doc.text('EpiSense Disease Surveillance Report', 20, 20);
    doc.text(`Title: ${config.title}`, 20, 30);
    doc.text(`Date Range: ${config.dateRange}`, 20, 40);
    doc.text('Selected Sections:', 20, 50);
    config.sections.forEach((section, index) => {
      doc.text(`- ${section}`, 30, 60 + (index * 10));
    });
    doc.save('episense-report.pdf');
  };

  const exportCSV = () => {
    const data = [
      ['Date', 'Cases', 'Location', 'Risk Level'],
      ['2024-02-20', 100, 'New York', 'High'],
      ['2024-02-20', 50, 'London', 'Medium'],
      ['2024-02-20', 20, 'Tokyo', 'Low'],
    ];

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'episense-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Report Builder</h2>
        <ReportBuilder onGenerate={generatePDF} />
      </div>

      <div className="card">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Export</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="daily">Daily Report</option>
              <option value="weekly">Weekly Report</option>
              <option value="monthly">Monthly Report</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => generatePDF({ title: 'Quick Report', dateRange: reportType, sections: ['summary'] })} className="btn btn-primary">
              Generate PDF
            </button>
            <button onClick={exportCSV} className="btn btn-primary">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}