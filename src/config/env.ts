import * as Joi from 'joi';

export const envObject = Joi.object({
    MONGO_URI: Joi.string().required(),
    PORT: Joi.number().required(),
    MQ_HOSTNAME: Joi.string().required(),
    MQ_PORT: Joi.number().required(),
    MQ_USER: Joi.string().required(),
    MQ_PWD: Joi.string().required(),
    MINIO_ENDPOINT: Joi.string().required(),
    MINIO_PORT: Joi.number().required(),
    MINIO_ACCESS_KEY: Joi.string().required(),
    MINIO_SECRET_KEY: Joi.string().required(),
    MINIO_BUCKET_NAME: Joi.string().required(),
    MINIO_USE_SSL: Joi.boolean().required(),
});

export const ENV = {
    MONGO_URI: 'MONGO_URI',
    PORT: 'PORT',
    MQ_HOSTNAME: 'MQ_HOSTNAME',
    MQ_PORT: 'MQ_PORT',
    MQ_USER: 'MQ_USER',
    MQ_PWD: 'MQ_PWD',
    MINIO_ENDPOINT: 'MINIO_ENDPOINT',
    MINIO_PORT: 'MINIO_PORT',
    MINIO_ACCESS_KEY: 'MINIO_ACCESS_KEY',
    MINIO_SECRET_KEY: 'MINIO_SECRET_KEY',
    MINIO_BUCKET_NAME: 'MINIO_BUCKET_NAME',
    MINIO_USE_SSL: 'MINIO_USE_SSL',
}