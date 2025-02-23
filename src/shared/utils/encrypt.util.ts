import * as crypto from 'crypto';

import * as argon2 from 'argon2';

export const generateMd5Hash = (data: string): string => {
  return generateHash('md5', data);
};



export const generateSha256Hash = (data: string): string => {
  return generateHash('sha256', data);
};

export const verifySha256Hash = async (data: string, hash: string): Promise<boolean> => {
  const hashedData = generateSha256Hash(data);

  return verifyHash(hashedData, hash);
};



export const generateArgon2Hash = async (data: string): Promise<string> => {
  return argon2.hash(data, { type: argon2.argon2id });
};

export const verifyArgon2Hash = async (data: string, hash: string): Promise<boolean> => {
  try {
    return await argon2.verify(hash, data);
  } catch {
    //log here
    return false;
  }
};


const generateHash = (
  algorithm: string,
  data: string,
  format: crypto.BinaryToTextEncoding = 'hex',
): string => {
  return crypto.createHash(algorithm).update(data).digest(format);
};

const verifyHash = (hashedData: string, hash: string): boolean => {
  try {
    if (Buffer.byteLength(hash) !== Buffer.byteLength(hashedData)) {
      return false;
    }

    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hashedData));
  } catch {
    //log here
    return false;
  }
};
