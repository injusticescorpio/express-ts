import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{type: 'string',required: true},
    email:{type: 'string',required: true},
    authentication:{
        password:{type: 'string',required: true,select:false},
        salt:{type: 'string',select:false},
        sessionToken:{type: 'string',select:false}

    }
})


// don't want to fetch authentication details during invoking using postman/other tools that why select is false

export const userModel=mongoose.model('User',userSchema);

export const getUsers=()=>userModel.find()
export const getUserByEmail=(email:string)=>userModel.findOne({email})
export const getUserBySessionToken=(sessionToken:string)=>userModel.findOne({
    'authentication.sessionToken':sessionToken
})
export const getUserById=(id:string)=>userModel.findById(id)
export const createUser=(values:Record<string,any>)=>new userModel(values).save().then((user)=>user.toObject())
export const deleteUserById=(id:string)=>userModel.findOneAndDelete({_id:id})
export const updateUserById=(id:string,values: Record<string,any>)=>userModel.findByIdAndUpdate(id,values)