import { Request } from 'express';

export default function verify(req: Request) {
  return !!req.body.userId;
}
