import { Request, Response, NextFunction } from 'express';
import {CustomError} from '../errors/customError'

const errorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof CustomError ){
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: "Something went wrong!, Please try again"})
}

export default errorHandlerMiddleware