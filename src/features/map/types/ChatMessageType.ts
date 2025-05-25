export interface ChatMessageType {
  init: boolean;
  who: 'user' | 'bot';
  response: string;
  function_call: {
    name: string;
    arguments: string;
  };
  result: any[];
}
