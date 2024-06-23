import express from 'express';
import {getUserByEmail,createUser} from '../db/users'
import { authentication, random } from '../helpers';
export const register = async(req: express.Request, res: express.Response) =>{
    try{
        const {email,password,username}=req.body
        if(!email || !password || !username){
            return res.sendStatus(400)
        }
        const existingUser= await getUserByEmail(email)
        if(existingUser){
            return res.sendStatus(400)
        }
        const salt=random()
        const user=await createUser({email,username,password,
            authentication:{
                salt,
                password:authentication(salt,password)
            }
        })
        return res.json(user);

    }catch(err){
        console.log(err);
        return res.sendStatus(400)
    }
}


export const login=async(req: express.Request,res:express.Response)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).send("email/password missing")
        }
        const user=await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if(!user){
            return res.sendStatus(400)
        }
        const expectedHash=authentication(user.authentication.salt,password)
        if(user.authentication.password !== expectedHash){
            return res.status(403).send("password mismatch")
        }
        const salt=random()
        user.authentication.sessionToken=authentication(salt,user._id.toString())
        await user.save()
        res.cookie('Arjun-Auth',user.authentication.sessionToken,{domain:'localhost',path:'/'})
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}