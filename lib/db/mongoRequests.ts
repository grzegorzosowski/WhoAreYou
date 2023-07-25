import { database } from './mongoDbConnection';
import { NextApiRequest } from 'next';
import { RequestHistory, SaveRequestLogs } from '../types';

const collection = database.collection<RequestHistory>('requestHistory');

export function saveRequest({ name, genderData, nationalityData }: SaveRequestLogs) {
  const timestamp = new Date();
  return collection.insertOne({ name, genderData, nationalityData, timestamp });
}

export function findNameInRequestHistory(name: string) {
  return collection.findOne({ name });
}

export async function getHistoryData(req: NextApiRequest) {
  const { page, PAGE_SIZE } = req.query;
  const totalItems = await collection.countDocuments();
  const skip = (Number(page) - 1) * Number(PAGE_SIZE);
  const data = await collection
    .find()
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(Number(PAGE_SIZE))
    .toArray();
  return { data, totalItems };
}
