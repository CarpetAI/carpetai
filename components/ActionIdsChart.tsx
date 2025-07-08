import { useState, useEffect, useMemo } from "react";
import { ActionId } from "@/types";

interface ActionIdsChartProps {
  actionIds: ActionId[];
}

function formatActionLabel(id: string) {
  const parts = id.split("_");
  if (parts.length <= 1) return id;
  const label = parts.join(" ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function ActionIdsChart({ actionIds }: ActionIdsChartProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredActionIds = useMemo(() => 
    actionIds?.filter(
      (a) =>
        !a.id.startsWith("input") &&
        !a.id.startsWith("scrolled") &&
        !(a.id.includes("clicked") && a.id.includes("input")) &&
        !a.id.includes("element")
    ) || [], [actionIds]
  );

  const sortedActionIds = useMemo(() => 
    filteredActionIds.sort((a, b) => b.count - a.count), [filteredActionIds]
  );

  useEffect(() => {
    if (!actionIds || actionIds.length === 0) {
      return;
    }

    const savedSelectedIds = localStorage.getItem('selectedActionIds');
    if (savedSelectedIds) {
      const parsedIds = JSON.parse(savedSelectedIds);
      const validIds = parsedIds.filter((id: string) => 
        sortedActionIds.some(action => action.id === id)
      );
      if (validIds.length > 0) {
        setSelectedIds(validIds);
      } else if (sortedActionIds.length > 0) {
        setSelectedIds([sortedActionIds[0].id]);
      }
    } else if (sortedActionIds.length > 0) {
      setSelectedIds([sortedActionIds[0].id]);
    }
  }, [actionIds, sortedActionIds]);

  if (!actionIds || actionIds.length === 0) {
    return null;
  }

  if (selectedIds.length === 0 && sortedActionIds.length > 0) {
    setSelectedIds([sortedActionIds[0].id]);
  }

  const handleCheckboxChange = (id: string) => {
    const newSelectedIds = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    
    setSelectedIds(newSelectedIds);
    localStorage.setItem('selectedActionIds', JSON.stringify(newSelectedIds));
  };

  const selectedActionIds = sortedActionIds.filter((a) => selectedIds.includes(a.id));

  const colors = [
    'bg-purple-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-pink-400',
    'bg-yellow-400',
    'bg-teal-400',
  ];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top User Actions</h3>
      <div className="mb-4 max-h-40 overflow-y-auto border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-wrap gap-3">
        {sortedActionIds.map((action) => (
          <label key={action.id} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.includes(action.id)}
              onChange={() => handleCheckboxChange(action.id)}
              className="accent-blue-500"
            />
            <span className="break-words">{formatActionLabel(action.id)}</span>
          </label>
        ))}
      </div>
      {selectedActionIds.length === 0 ? (
        <div className="text-gray-500 text-center py-8">Select at least one action to display.</div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(selectedActionIds.length, 3)} gap-6`}>
          {selectedActionIds.map((action, idx) => (
            <div
              key={action.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-start min-w-[220px] min-h-[160px]"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}></span>
                <span className="text-sm font-medium text-gray-700 break-words">
                  {formatActionLabel(action.id)} [Total Events]
                </span>
              </div>
              <span className="text-5xl font-bold text-gray-900">{action.count}</span>
              <span className="text-xs text-gray-500 mt-1">events</span>
            </div>
          ))}
        </div>
      )}
      {filteredActionIds.length > 3 && (
        <div className="mt-4 text-sm text-gray-500 text-center">
          +{filteredActionIds.length - 3} more action IDs
        </div>
      )}
    </div>
  );
} 