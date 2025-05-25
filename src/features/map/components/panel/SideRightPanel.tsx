import { ChevronRight, X } from 'lucide-react';
import RightPanelContent from './RightPanelContent';
import usePanelStore from '../../store/panel/usePanelStore';

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
        className="absolute right-4 top-4 z-20 overflow-auto rounded bg-white p-1 shadow hover:bg-gray-100"
      >
        {rightPanelOpen ? (
          <X size={12} className="text-gray-600" />
        ) : (
          <ChevronRight size={12} className="text-gray-600" />
        )}
      </button>

      {rightPanelOpen && <RightPanelContent />}
    </>
  );
}
export default SideRightPanel;
