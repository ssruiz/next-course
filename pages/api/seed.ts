import type { NextApiRequest, NextApiResponse } from 'next';
import { DB, seedData } from '../../database';

import { Product, User } from '../../models';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production')
    res.status(4101).json({ message: "You don't acces to this service" });

  await DB.connect();

  await Product.deleteMany();
  await Product.insertMany(seedData.initialData.products);

  await User.deleteMany();
  await User.insertMany(seedData.initialData.users);

  await DB.disconnect();

  res.status(200).json({ message: 'The DB has been populated' });
}
