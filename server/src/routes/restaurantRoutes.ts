import express,{Router} from  'express'
import { registerRestaurant } from '../controllers/restaurantController'

const router: Router = express.Router()

router.route("/addRestaurant").post(registerRestaurant)

export default router