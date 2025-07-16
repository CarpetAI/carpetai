import React from "react";

type TimeRange = {
  label: string;
  getRange: () => { start?: number; end?: number };
};

interface TimeRangeSelectorProps {
  selectedLabel: string;
  onChange: (range: { label: string; start?: number; end?: number }) => void;
  loading?: boolean;
}

const timeRanges: TimeRange[] = [
  { label: 'Today', getRange: () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
    const end = now.getTime() / 1000;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: 'Yesterday', getRange: () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).getTime() / 1000;
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: '7D', getRange: () => {
    const now = new Date();
    const end = now.getTime() / 1000;
    const start = end - 7 * 24 * 60 * 60;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: '30D', getRange: () => {
    const now = new Date();
    const end = now.getTime() / 1000;
    const start = end - 30 * 24 * 60 * 60;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: '3M', getRange: () => {
    const now = new Date();
    const end = now.getTime() / 1000;
    const start = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()).getTime() / 1000;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: '6M', getRange: () => {
    const now = new Date();
    const end = now.getTime() / 1000;
    const start = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()).getTime() / 1000;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: '12M', getRange: () => {
    const now = new Date();
    const end = now.getTime() / 1000;
    const start = new Date(now.getFullYear(), now.getMonth() - 12, now.getDate()).getTime() / 1000;
    return { start: Math.floor(start), end: Math.floor(end) };
  }},
  { label: 'Default', getRange: () => ({}) },
];

export default function TimeRangeSelector({ selectedLabel, onChange, loading }: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {timeRanges.map((range) => (
        <button
          key={range.label}
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${selectedLabel === range.label ? 'bg-gray-200 border-gray-400 text-gray-900' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onChange({ label: range.label, ...range.getRange() })}
          disabled={loading}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
} 