import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
import router from './router'
dotenv.config(); 

console.log(process.env.PORT_NUMBER)
const app = express();

app.use(cors({
    credentials:true
}));

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server=http.createServer(app);

server.listen(8080,()=>{
    console.log("server listening on 8080")
})


mongoose.Promise=Promise
mongoose.connect(process.env.CONNECTION_STRING)
mongoose.connection.on('error',(err:Error)=>console.log("connection error"+err))

app.use('/',router())

