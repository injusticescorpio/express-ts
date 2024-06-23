import express from 'express'
import {get,identity,merge} from 'lodash'
import { getUserBySessionToken } from '../db/users'

export const isAuthenticated =async(req:express.Request, res: express.Response,next:express.NextFunction) => {
    try{
        const sessionToken = req.cookies['Arjun-Auth']
        if(!sessionToken){
            return res.status(400).send("No session token found..")
        }
        const existingUser=await getUserBySessionToken(sessionToken)
        if(!existingUser){
            return res.status(403).send("Authentication failed")
        }
        console.log("existingUser is ")
        console.log(existingUser)
        merge(req,{identity:existingUser})
        return next()
    }catch(err){
        console.log(err)
        res.status(400)
    }
}

export const isOwner = async(req:express.Request, res: express.Response,next:express.NextFunction)=>{
    try{
        const {id}=req.params
        const currentUserId = get(req,'identity._id') as string;

        console.log(currentUserId)
        if(!currentUserId){
            return res.status(400).send("no current users exist")
        }
        console.log("id is "+id)
        console.log("currentuserid is "+currentUserId.toString())
        if(currentUserId.toString()!==id){
            return res.sendStatus(403)
        }
        return next()
    }catch(err){
        console.log(err)
        res.status(400).send("isowner action failed")
    }
}



