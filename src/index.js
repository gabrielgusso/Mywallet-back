import express from "express"
import cors from "cors"

import authRouters from "./routes/auth.routes.js"
import activitesRouters from "./routes/activites.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(activitesRouters)
app.use(authRouters)


app.listen(5000, () => console.log("Server running in port: 5000"))
