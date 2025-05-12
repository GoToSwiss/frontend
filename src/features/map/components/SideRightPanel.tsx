import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

function SideRightPanel() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="absolute right-4 top-4 z-20 rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {open ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>
      {open && (
        <div className="w-70 absolute right-4 top-11 z-10 h-[90%] space-y-6 rounded-lg bg-white p-4 shadow-md">
          <h1 className="text-sm font-semibold">서울 특별시 강남구</h1>
          <span className="text-xs text-gray-500">마지막 업데이트: 2025-05-12 15:30</span>
        </div>
      )}
    </>
  );
}

export default SideRightPanel;
