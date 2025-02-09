import * as Joi from 'joi';

export const envObject = Joi.object({
    MONGO_URI: Joi.string().required(),
    PORT: Joi.number().required(),
    MQ_HOSTNAME: Joi.string().required(),
    MQ_PORT: Joi.number().required(),
    MQ_USER: Joi.string().required(),
    MQ_PWD: Joi.string().required()
});

export const ENV = {
    MONGO_URI: 'MONGO_URI',
    PORT: 'PORT',
    MQ_HOSTNAME: 'MQ_HOSTNAME',
    MQ_PORT: 'MQ_PORT',
    MQ_USER: 'MQ_USER',
    MQ_PWD: 'MQ_PWD'
}