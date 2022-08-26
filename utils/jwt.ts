import { rejects } from 'assert';
import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('Theres no seed for JWT');
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: '30d',
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('Theres no seed for JWT');
  }

  if (token.length <= 10) {
    return Promise.reject('No valid token');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('Token is not valid');

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {}
  });
};
