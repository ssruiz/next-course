import { DB } from '.';
import { User } from '../models';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await DB.connect();

  const user = await User.findOne({ email });

  await DB.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    role,
    name,
    email: email.toLocaleLowerCase(),
    _id,
  };
};

export const checkUserOauth = async (oAuthEmail: string, oAuthName: string) => {
  await DB.connect();

  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await DB.disconnect();
    const { role, name, _id, email } = user;

    return {
      role,
      name,
      email,
      _id,
    };
  }

  const newUser = new User({
    email: oAuthEmail,
    role: 'client',
    name: oAuthName,
    password: '@',
  });

  await newUser.save();
  await DB.disconnect();

  const { role, name, _id, email } = newUser;
  return {
    role,
    name,
    email,
    _id,
  };
};
