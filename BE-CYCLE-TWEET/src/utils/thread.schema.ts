import Joi from 'joi';

export const ThreadSchema = Joi.object({
  content: Joi.string().required(),
  imageUrl: Joi.any().optional(),
  userId: Joi.number(),
});

export const likeSchema = Joi.object({
  threadId: Joi.number().required(),
});

export type CreateThreadDTO = {
  content: string;
  image?: string;
};

export type UpdateThreadDTO = CreateThreadDTO & { id: number };
