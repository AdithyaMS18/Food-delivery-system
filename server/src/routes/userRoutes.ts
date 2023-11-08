import express,{Router} from  'express'
import { signUp, login } from '../controllers/userController'

const router: Router = express.Router()

router.route("/signup").post(signUp)
router.route("/login").post(login)

export default router