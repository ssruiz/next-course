import mongoose from 'mongoose';

/**
 *
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
  isConnected: 0,
};

export const connect = async () => {
  const URL_DB = process.env.DB_URL;

  console.log('URL_DB', URL_DB);
  if (mongoConnection.isConnected === 1) {
    console.log('Already connected');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;

    if (mongoConnection.isConnected === 1) {
      console.log('Using previous connection');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(URL_DB || '');

  mongoConnection.isConnected = 1;
  console.log(`Connected to Mongodb: ${URL_DB}`);
};

export const disconnect = async () => {
  if (mongoConnection.isConnected === 0) return;
  await mongoose.disconnect();
  mongoConnection.isConnected = 0
  console.log('Disconnected from MongoDB');
};
