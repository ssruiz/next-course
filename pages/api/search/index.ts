import type { NextApiRequest, NextApiResponse } from 'next';
import { IProduct } from '../../../interfaces/products';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return res.status(400).json({
    message: 'No query to search',
  });
}
