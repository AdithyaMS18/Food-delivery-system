import { createCustomError } from "../errors/customError";
import User from "../Models/User"
import jwt, { Secret } from 'jsonwebtoken'

import { Request, Response, NextFunction } from 'express';

const createJWT =(user:any)=>{
  return jwt.sign({userId: user._id, Uname: user.Uname}, process.env.JWT_SECRET as Secret,{expiresIn:process.env.JWT_LIFETIME})
}
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract required details from the body of the Request
        const { name, email, password }: { name: string, email: string, password: string } = req.body;

        // Check whether the user has provided all the values and if all values are not provided, throw an error
        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400));
        }

        // Check whether the user already exists, and if the email is already registered, throw an error
        const userExists = await User.findOne({ where: { email: 'john.doe@example.com' } });
        if (userExists) {
            return next(createCustomError("User already exists", 400));
        }



        // Then store the user in the database
        const user = await User.create({ Uname:name, Uemail:email, Upassword: password });

        // Create a unique token for each user (required for frontend authorization)
        const token = createJWT(user);

        // Send the required data (password is not required) to the frontend
        res.status(201).json({
            user,
            token
        });

    } catch (error) {
        next(error);
    }
}

/*CREATING A NEW USER USING SEQUELIZE
const jane = User.build({ Uname: "Jane", Uemail: "ani@gmail.com", Upassword:"ani", Uaddress:"karanth compound" });
  console.log(jane)
  await jane.save();

*/