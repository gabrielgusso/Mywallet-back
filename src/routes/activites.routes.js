import {getBalance, getActivites, postActivites} from "../controllers/activityController.js"
import tokenValidation from "../middlewares/tokenValidation.middleware.js"
import {Router} from "express"

const router = Router()

router.post("/activity",tokenValidation, postActivites)

router.get("/activity",tokenValidation, getActivites)

router.get("/balance",tokenValidation, getBalance)

export default router