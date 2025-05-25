import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import usePanelStore from '../../store/panel/usePanelStore';
import RenderResultTable from './RenderResultTable';
import useChatBot from '../../query/chatbot.query';
import FunctionCallDisplay from './FunctionCallDisplay';
import TypingText from './TypingText';
import useChatStore from '../../store/useChatStore';

function ChatBot() {
  const { closeRightPanel, isChatOpen, toggleChatOpen } = usePanelStore();
  const messages = useChatStore((state) => state.messages);
  const addMessage = useChatStore((state) => state.addMessage);
  const [input, setInput] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any[]>([]);

  const { mutate: sendMessage, isPending } = useChatBot();

  const chatStart = () => {
    toggleChatOpen();
    closeRightPanel();
  };

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage({
      init: false,
      who: 'user',
      response: input,
      function_call: { name: '', arguments: '' },
      result: [],
    });

    sendMessage({ question: input });
    setInput('');
  };

  const openModal = (result: any[]) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult([]);
  };

  return (
    <div>
      <button
        onClick={chatStart}
        className="absolute bottom-6 right-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {isChatOpen && (
        <div className="absolute bottom-20 right-6 z-50 flex h-[80%] w-[40%] flex-col overflow-auto rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-sm font-semibold">AI 채팅</span>
            <button onClick={toggleChatOpen} className="text-sm text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto py-2">
            {messages.map((msg) => (
              <div
                key={uuidv4()}
                className={`flex w-full ${msg.who === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%]">
                  <div
                    className={`rounded px-3 py-2 text-sm ${
                      msg.who === 'user' ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'
                    }`}
                  >
                    <TypingText text={msg.response} init={msg.init} />
                  </div>

                  {msg.function_call.name !== '' && <FunctionCallDisplay {...msg.function_call} />}

                  {msg.result && msg.result.length > 0 && (
                    <button
                      onClick={() => openModal(msg.result)}
                      className="mt-2 text-xs text-blue-600 hover:underline"
                    >
                      ▶ 결과 더보기
                    </button>
                  )}
                  {msg.function_call.name !== '' && msg.function_call.name !== 'run_sql' && (
                    <button
                      onClick={() => openModal(msg.result)}
                      className="mt-2 text-xs text-blue-600 hover:underline"
                    >
                      ▶ 위치 이동하기
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isPending && <div className="text-center text-sm text-gray-500">생각중...</div>}
          </div>

          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="메시지를 입력하세요"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              전송
            </button>
          </div>
        </div>
      )}

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

export default ChatBot;
