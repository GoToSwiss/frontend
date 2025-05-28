import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChatMessageType } from '../types/ChatMessageType';
import useChatStore from '../store/useChatStore';

const useChatBot = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  return useMutation<ChatMessageType, Error, { question: string }>({
    mutationFn: ({ question }) =>
      axios
        .post(`http://${import.meta.env.VITE_CHAT_URL}:8774/chat`, { question })
        .then((res) => res.data),

    onSuccess: (data) => {
      addMessage(data);
    },
    onError: () => {
      addMessage({
        init: true,
        who: 'bot',
        response: '죄송합니다. 다시 시도해주세요.',
        function_call: { name: '', arguments: '' },
        result: [],
      });
    },
  });
};

export default useChatBot;
