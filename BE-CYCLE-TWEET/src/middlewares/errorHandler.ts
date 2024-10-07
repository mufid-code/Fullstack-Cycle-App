import { Request, Response } from 'express';

export const handleError = (res: Response, err: any) => {
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
};
