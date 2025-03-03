import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next) => {
    const {username,email,password} = req.body;
    const hashedPwd = bcryptjs.hashSync(password,10)
    const newUser = new User({username,email,password:hashedPwd});
    try{
        await newUser.save();
        res.status(201).json('User created successfully')
    } catch(err) {
        next(err)
    }
}

export const login = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found!'));
        const validPasword = bcryptjs.compareSync(password,validUser.password)
        if(!validPasword) return next(errorHandler(401,'Wrong credential!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_TOKEN)
        res
        .cookie('access_token', token, {httpOnly:true})
        .status(200)
        .json(validUser);
    } catch(err) {
        next(err)
    }
}

export const google = async (req,res,next) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({ id: user._id}, process.env.JWT_TOKEN);
            const { password: pass, ...rest} = user._doc;
            res
                .cookie('access_token', token, {httpOnly:true})
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(32).slice(-8) + Math.random().toString(32).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(32).slice(-4),
                email: req.body.email, password: hashPassword, avatar: req.body.userImg
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id}, process.env.JWT_TOKEN);
            const { password: pass, ...rest} = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly:true})
                .status(200)
                .json(rest)
        }
       
    } catch(err) {
        next(err)
    }
}