import express from 'express';
import { getUsers,deleteUserById,getUserById } from '../db/users';


export const getAllUsers = async(req: express.Request, res: express.Response)=>{
    try{
        const users = await getUsers();
        return res.status(200).json(users)

    }catch(err){
        console.log(err);
        res.status(400).send("get all users failed");
    }

}


export const deleteUsers=async(req: express.Request, res: express.Response)=>{
    try{
        const {id}=req.params
        const deletedUser=await deleteUserById(id)
        return res.json(deletedUser)
    }catch(err){
        console.log(err);
        res.status(400).send("delete users failed");
    }
}

export const updateUsers=async(req: express.Request, res: express.Response)=>{
    try{
        const {id}=req.params
        const {username}=req.body
        if(!username){
            return res.status(400).send("no username found")
        }
        const user=await getUserById(id)
        user.username=username
        await user.save()
        return res.status(200).json(user)
    }catch(err){
        console.log(err)
        return res.status(400).send("failed to update user")
    }
}