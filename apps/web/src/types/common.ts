export type ErrorLevel = 'info' | 'error';

export type Error = {
  level: ErrorLevel;
  message: string;
};
