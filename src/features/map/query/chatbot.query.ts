import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChatMessageType } from '../types/ChatMessageType';
import useChatStore from '../store/useChatStore';

const useChatBot = () => {
  const setMessages = useChatStore((state) => state.setMessages);
  const getMessages = useChatStore.getState;

  return useMutation<ChatMessageType, Error, { question: string }>({
    mutationFn: ({ question }) =>
      axios
        .post(`http://${import.meta.env.VITE_CHAT_URL}:8774/chat`, { question })
        .then((res) => res.data),

    onSuccess: (data) => {
      const currentMessages = getMessages().messages;
      const processedMessages = currentMessages.map((msg) => ({ ...msg, init: false }));
      setMessages([...processedMessages, { ...data, init: true }]);
    },
  });
};

export default useChatBot;
