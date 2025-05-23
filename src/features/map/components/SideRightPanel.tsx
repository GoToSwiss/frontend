import { ChevronRight, X } from 'lucide-react';
import RightPanelContent from './RightPanelContent';
import usePanelStore from '../store/usePanelStore';

function SideRightPanel() {
  const { rightPanelOpen, toggleRightPanel, closeChat } = usePanelStore();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          toggleRightPanel();
          closeChat();
        }}
        className="absolute right-4 top-4 z-20 rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {rightPanelOpen ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>

      {rightPanelOpen && (
        <div className="absolute right-4 top-11 z-10 h-[90%] w-72 space-y-6 overflow-y-auto rounded-lg bg-white p-4 shadow-md">
          <RightPanelContent />
        </div>
      )}
    </>
  );
}
export default SideRightPanel;
