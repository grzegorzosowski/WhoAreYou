import { getHistoryData } from '@/lib/db/mongoRequests';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const response = await getHistoryData(req);
  res.status(200).json(response);
};
