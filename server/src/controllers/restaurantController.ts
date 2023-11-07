import { Request, Response, NextFunction } from 'express';
import Restaurant from "../Models/Restaurant"
import { createCustomError } from "../errors/customError"

export const registerRestaurant = async(req:Request, res:Response, next:NextFunction)=>{
    const { name, description, location, cid, profilePhoto} = req.body
    // const {userId} = req.params

    if( !name || !description || !location || !cid){
        return next(createCustomError("Please provide all values", 400))
    }

    try {
        const restaurant = await Restaurant.create({Rname:name,Rlocation:location,Rdescription:description,Rphoto:profilePhoto,Uid:1,Cid:cid });
    
        res.status(201).json(restaurant);
        
    } catch (error) {
        next(error)
    }

        
}

export const loginRestaurant = async(req:Request, res:Response, next:NextFunction)=>{
    

        
}