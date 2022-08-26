import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt } from '../../../utils';

type Data =
  | {
      message: string;
    }
  | { token: string; user: { email: string; name: string; role: string } };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return validateToken(req, res);
      break;

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}
const validateToken = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  console.log(req.cookies);

  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token.toString());
  } catch (error) {
    return res.status(401).json({ message: 'Token no valid' });
  }
  await DB.connect();

  const user = await User.findById(userId).lean();

  await DB.disconnect();

  if (!user) return res.status(400).json({ message: 'No user with that ID' });

  // if (!bcrypt.compareSync(password, user.password!)) {
  //   return res.status(400).json({ message: 'Wrong email or password' });
  // }

  // const { role, name, _id } = user;

  // const token = jwt.signToken(_id, email);

  const { email, role, name } = user;
  return res.status(200).json({
    token: jwt.signToken(userId, email),
    user: {
      email,
      role,
      name,
    },
  });
};
