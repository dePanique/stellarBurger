export const WS_START: 'WS_START' = 'WS_START';
export const WS_SUCCESS: 'WS_SUCCESS' = 'WS_SUCCESS';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';
export const WS_SEND: 'WS_SEND' = 'WS_SEND';
export const WS_CLOSED: 'WS_CLOSED' = 'WS_CLOSED';
export const WS_FAILED: 'WS_FAILED' = 'WS_FAILED';

export const CLOSE_WS: 'CLOSE_WS' = 'CLOSE_WS';

export type TWSconstant =
  | typeof WS_START
  | typeof WS_SUCCESS
  | typeof WS_MESSAGE
  | typeof WS_SEND
  | typeof WS_CLOSED
  | typeof WS_FAILED
  | typeof CLOSE_WS