import { setupWorker } from 'msw/browser';

import handlers from './handlers';

export const worker = setupWorker(...handlers);

export const startWorker = async () => {
  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : '모킹 오류');
  }
};
