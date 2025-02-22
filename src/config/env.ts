import * as Joi from 'joi';

export const envObject = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  MQ_URI: Joi.string().required(),
  MINIO_ENDPOINT: Joi.string().required(),
  MINIO_PORT: Joi.number().required(),
  MINIO_ACCESS_KEY: Joi.string().required(),
  MINIO_SECRET_KEY: Joi.string().required(),
  MINIO_BUCKET_NAME: Joi.string().required(),
  MINIO_USE_SSL: Joi.boolean().required(),
});

export const ENV = {
  PORT: 'PORT',
  MONGO_URI: 'MONGO_URI',
  MQ_URI: 'MQ_URI',
  MINIO_ENDPOINT: 'MINIO_ENDPOINT',
  MINIO_PORT: 'MINIO_PORT',
  MINIO_ACCESS_KEY: 'MINIO_ACCESS_KEY',
  MINIO_SECRET_KEY: 'MINIO_SECRET_KEY',
  MINIO_BUCKET_NAME: 'MINIO_BUCKET_NAME',
  MINIO_USE_SSL: 'MINIO_USE_SSL',
};
