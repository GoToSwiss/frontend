import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ChatMessageType } from '../types/ChatMessageType';

interface ChatState {
  messages: ChatMessageType[];
  setMessages: (msgs: ChatMessageType[]) => void;
  addMessage: (msg: ChatMessageType) => void;
  clearMessages: () => void;
}

const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [
        {
          init: true,
          who: 'bot',
          response: '안녕하세요! 무엇을 도와드릴까요?',
          function_call: { name: '', arguments: '' },
          result: [],
        },
      ],
      setMessages: (msgs) => set({ messages: msgs }),
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-messages',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useChatStore;
