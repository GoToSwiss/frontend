import RenderResultTable from './RenderResultTable';

interface ChatModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  selectedResult: any[];
}

function ChatModal({ isModalOpen, closeModal, selectedResult }: ChatModalProps) {
  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') closeModal();
          }}
        >
          <div
            role="button"
            tabIndex={0}
            className="max-h-[80%] w-[90%] max-w-4xl overflow-y-auto rounded bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') closeModal();
            }}
          >
            <div className="mb-4 flex justify-between">
              <h2 className="text-lg font-semibold">📊 조회 결과</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                닫기 ✕
              </button>
            </div>
            <RenderResultTable data={selectedResult} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatModal;
