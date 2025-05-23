import { useState } from 'react';
import usePanelStore from '../store/usePanelStore';

function ChatBot() {
  const { closeRightPanel, isChatOpen, toggleChatOpen } = usePanelStore();
  const [messages, setMessages] = useState([
    { from: 'bot', text: '안녕하세요! 무엇을 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');

  function chatStart() {
    toggleChatOpen();
    closeRightPanel();
  }

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: 'user', text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: '아직은 연동되지 않았어요 😅' }]);
    }, 500);
    setInput('');
  }

  return (
    <div>
      <button
        onClick={chatStart}
        className="absolute bottom-6 right-6 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700"
      >
        💬
      </button>
      {isChatOpen && (
        <div className="absolute bottom-20 right-6 z-50 flex h-[80%] w-[30%] flex-col rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-sm font-semibold">AI 챗봇</span>
            <button onClick={toggleChatOpen} className="text-sm text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto py-2">
            {messages.map((msg) => (
              <div
                key={msg.text}
                className={`w-fit max-w-[80%] rounded px-3 py-2 text-sm ${
                  msg.from === 'user'
                    ? 'ml-auto bg-gray-100 text-gray-800'
                    : 'mr-auto bg-blue-500 text-white'
                }`}
              >
                {msg.text}
              </div>
            ))}
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
    </div>
  );
}

export default ChatBot;
