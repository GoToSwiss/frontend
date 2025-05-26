import { useEffect, useState, useRef } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  init?: boolean;
}

export default function TypingText({ text, speed = 100, init = true }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState(init ? '' : text);
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
    };

    type();

    // eslint-disable-next-line consistent-return
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, init]);

  return <span>{displayedText}</span>;
}
