import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import usePanelStore from '../../store/panel/usePanelStore';
import useChatBot from '../../query/chatbot.query';
import FunctionCallDisplay from './FunctionCallDisplay';
import useChatStore from '../../store/useChatStore';
import focusOnSQLLocation from '../../utils/focusSQLLocation';
import useDataVisualTypeStore from '../../store/panel/useDataVisualTypeStore';
import TypingText from './TypingText';
import ChatModal from './ChatModal';

function ChatBot() {
  const { closeRightPanel, isChatOpen, toggleChatOpen } = usePanelStore();
  const { messages, addMessage, clearMessages } = useChatStore();

  const setDataVisualType = useDataVisualTypeStore((state) => state.setDataVisualType);
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
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700"
      >
        💬
      </button>

      {isChatOpen && (
        <div className="absolute bottom-20 right-6 z-50 flex h-[80%] w-[32%] flex-col overflow-auto rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-7">
              <span className="text-sm font-semibold">onAir 챗봇</span>
              <button
                className="text-xs font-semibold text-red-600"
                onClick={() => {
                  const confirmed = window.confirm('정말로 챗 기록을 모두 비우시겠습니까?');
                  if (confirmed) {
                    clearMessages();
                    addMessage({
                      init: true,
                      who: 'bot',
                      response: '안녕하세요! 무엇을 도와드릴까요?',
                      function_call: { name: '', arguments: '' },
                      result: [],
                    });
                  }
                }}
              >
                챗 비우기
              </button>
            </div>
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
                    {msg.response && <TypingText text={msg.response} init={msg.init} />}
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
                      onClick={() => {
                        const args = JSON.parse(msg.function_call.arguments);
                        setDataVisualType('marker');
                        focusOnSQLLocation(args.station_name);
                      }}
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
              className="h-8 flex-1 rounded border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="관측소나 기상청 관련 질문을 해보세요!"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="h-8 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              전송
            </button>
          </div>
        </div>
      )}

      <ChatModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedResult={selectedResult}
      />
    </div>
  );
}

export default ChatBot;
