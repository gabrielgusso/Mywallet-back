import { activitySchema } from "../schemas/schemas.js"
import { db } from "../database/db.js"

export async function postActivites(req, res) {
    const activity = req.body
    const { description, value, type } = activity
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    const session = await db.collection("sessions").findOne({ token })
  
    if (!session) {
      return res.sendStatus(401)
    }
  
    const validation = activitySchema.validate(activity, { abortEarly: false })
    if (validation.error) {
      const error = validation.error.details.map((detail) => detail.message)
      res.status(422).send(error)
      return
    }
  
    try {
      await db.collection("activites").insertOne({
        userId: session.userId,
        type,
        value,
        description,
      })
      return res.sendStatus(201)
    } catch (error) {
      console.log(error)
    }
  }

  export async function getActivites(req, res){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const session = await db.collection("sessions").findOne({ token })
  
    if (!session) {
      return res.sendStatus(401)
    }
  
    try {
      const activitys = await db
        .collection("activites")
        .find({ userId: session.userId })
        .toArray()
      delete activitys.userId
      return res.send(activitys)
    } catch (error) {
      console.log(error)
    }
  }

  export async function getBalance(req, res){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
  
    const session = await db.collection("sessions").findOne({ token })
  
    if (!session) {
      return res.sendStatus(401)
    }
  
    try {
      const activitys = await db
        .collection("activites")
        .find({ userId: session.userId })
        .toArray()
      let balance = 0
      activitys.forEach((e) => {
        if(e.type === "entry"){
          balance += Number(e.value)
        } else {
          balance -= Number(e.value)
        }
        
      })
      return res.send(balance.toString())
    } catch (error) {
      console.log(error)
    }
  }