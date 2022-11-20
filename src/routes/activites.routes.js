import {getBalance, getActivites, postActivites} from "../controllers/activityController.js"
import tokenValidation from "../middlewares/tokenValidation.middleware.js"
import {Router} from "express"

const router = Router()
router.use(tokenValidation)

router.post("/activity", postActivites)

router.get("/activity", getActivites)

router.get("/balance", getBalance)

export default router