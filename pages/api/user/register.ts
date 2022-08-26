import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from '../../../database';
import { User } from '../../../models';
import bcrypt from 'bcryptjs';
import { jwt, validation } from '../../../utils';

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
    case 'POST':
      return registerUser(req, res);
      break;

    default:
      return res.status(400).json({
        message: 'Bad request',
      });
  }
}
const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password to short' });
  }

  if (name.length < 6) {
    return res.status(400).json({ message: 'Name to short' });
  }

  if (!validation.isValidEmail(email)) {
    return res.status(400).json({ message: 'Email no valid' });
  }

  await DB.connect();

  const user = await User.findOne({ email }).lean();

  if (user) {
    return res.status(400).json({ message: 'Email already existed' });
    await DB.disconnect();
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Check server logs' });
  }

  const { _id } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role: 'client',
      name,
    },
  });
};
