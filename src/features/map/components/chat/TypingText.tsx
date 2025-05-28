import { useEffect, useState, useRef } from 'react';
import useChatStore from '../../store/useChatStore';

interface TypingTextProps {
  text: string;
  speed?: number;
  init?: boolean;
}

export default function TypingText({ text, speed = 100, init = true }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState(init ? '' : text);
  const message = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!init) {
      return;
    }
    indexRef.current = 0;
    setDisplayedText('');

    const type = () => {
      if (indexRef.current <= text.length) {
        setDisplayedText(text.slice(0, indexRef.current));
        indexRef.current += 1;
        timeoutRef.current = setTimeout(type, speed);
      }
      if (indexRef.current === text.length) {
        const updatedMessage = message.map((msg) => {
          if (msg.init) {
            return {
              ...msg,
              init: false,
            };
          }
          return msg;
        });
        setMessages(updatedMessage);
      }
    };

    type();

    // eslint-disable-next-line consistent-return
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, init]);

  return <span>{displayedText}</span>;
}
