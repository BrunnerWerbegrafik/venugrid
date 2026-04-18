import type { RequestSubmission } from '../types';

export interface SubmitResult {
  success: boolean;
  requestId: string;
}

/**
 * Request service. In stage 1 it only logs to the console and returns a
 * synthetic success response after a short delay. Stage 2 will swap the
 * implementation for a real API call without component changes.
 */
export const requestService = {
  async submit(data: RequestSubmission): Promise<SubmitResult> {
    const requestId = generateId();
    const timestamp = new Date().toISOString();

    // eslint-disable-next-line no-console
    console.log('[VenuGrid] Request submitted', {
      requestId,
      timestamp,
      data,
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    return { success: true, requestId };
  },
};

function generateId(): string {
  // Lightweight UUID-v4-style ID sufficient for a mock
  return 'req-' + crypto.randomUUID();
}
