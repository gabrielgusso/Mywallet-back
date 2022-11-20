import joi from "joi"

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

export const registerSchema = joi.object({
  username: joi.string().required().min(3),
  password: joi.string().required().min(8),
  email: joi.string().email().required(),
})

export const activitySchema = joi.object({
  type: joi.string().required().valid("entry", "exit"),
  value: joi.number().required(),
  description: joi.string().required().max(20),
})
