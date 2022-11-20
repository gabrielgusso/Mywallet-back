import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { loginSchema, registerSchema } from "../schemas/schemas.js"
import { db } from "../database/db.js"

export async function signUp(req, res){
  const register = req.body
  const { username, email, password } = register
  const validation = registerSchema.validate(register, { abortEarly: false })
  if (validation.error) {
    const error = validation.error.details.map((detail) => detail.message)
    res.status(422).send(error)
    return
  }
  const passwordHash = bcrypt.hashSync(password, 10)
  try {
    await db.collection("customers").insertOne({
      username: username,
      email: email,
      password: passwordHash,
    })
    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
  }
}

export async function signIn(req, res){
    const login = req.body
    const { email, password } = login
    const validation = loginSchema.validate(login, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(422).send(error)
      return
    }
    const user = await db.collection("customers").findOne({ email })
  
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid()
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      })
      res.send(token)
    } else {
      res.sendStatus(401)
    }
  }