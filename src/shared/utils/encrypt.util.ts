import * as crypto from 'crypto';

import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const generateMd5Hash = (data: string): string => {
  return generateHash('md5', data);
};

export const generateSha256Hash = (data: string): string => {
  return generateHash('sha256', data);
};

const generateHash = (
  algorithm: string,
  data: string,
  format: crypto.BinaryToTextEncoding = 'hex',
): string => {
  return crypto.createHash(algorithm).update(data).digest(format);
};

export const generateHmacSha256Hash = (data: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

export const verifySha256Hash = async (data: string, hash: string): Promise<boolean> => {
  const hashedData = generateSha256Hash(data);

  return verifyHash(hashedData, hash);
};

export const verifyHmacSha256Hash = (data: string, secret: string, hash: string): boolean => {
  const hashedData = generateHmacSha256Hash(data, secret);

  return verifyHash(hashedData, hash);
};

const verifyHash = (hashedData: string, hash: string): boolean => {
  if (Buffer.byteLength(hash) !== Buffer.byteLength(hashedData)) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedData));
};

export const generateBcryptHash = (data: string): string => {
  return bcrypt.hashSync(data, SALT_ROUNDS);
};

export const verifyBcryptHash = (data: string, hash: string): boolean => {
  return bcrypt.compareSync(data, hash);
};
