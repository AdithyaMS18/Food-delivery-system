import express from 'express';
import { registerRestaurant } from '../controllers/restaurantController.js';
const router = express.Router();
router.route("/addRestaurant").post(registerRestaurant);
export default router;
