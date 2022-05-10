import express,{NextFunction, Request,Response} from "express";
import dotenv from "dotenv";
import { UsersStore } from "../models/user";
import {User} from './../type/type'
import jwt, { Secret } from "jsonwebtoken";



const store=new UsersStore();

dotenv.config();

const show=async(req:Request,res:Response)=>{
    console.log("handler user params",
    req.params.id);
    res.json(await store.show(req.params.id))
}

const create=async(req:Request,res:Response)=>{
    try{
        const User:User={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            username:req.body.username,
            password:req.body.password
        }
        let user=await store.create(User);
        const expass=user.password
        const token =jwt.sign(
            {expass},
            process.env.TOKEN_SECRET as Secret);
        res.json(token);
    }catch(error){
        res.json(error)
        res.status(400)
    }
}

const index=async(req:Request,res:Response)=>{
    try{
        res.json(await store.index());
    }catch(error){
        res.status(400)
        res.json(error)
    }
}


const authenticate=async(req:Request, res:Response
    ) => {
    try{
        const token=await store.authenticate(req.body.username,req.body.password as string);
        if(token==null){
            res.status(400);
            res.send("invalid credentials");
        }
        else{
            res.json(jwt.sign(
                {token}
                ,process.env.TOKEN_SECRET as Secret));
        }
    }catch(error){
        res.json(error)
        res.status(400)
    }
}
//middleware
export function verify_token(req:Request,res:Response,next:NextFunction){
    try{
        if(!req.headers.authorization){
            res.status(401)
            res.json("no permision granted")
            return false;
        }
        const temp:string=req.headers.authorization as string;
        
        const dec=jwt.verify(temp,process.env.TOKEN_SECRET as jwt.Secret)
        next();
    }catch(error){
        res.status(401);
        res.json(`Access denied, Invalid Token${error}`)
        return false;
    }
}

const userRoutes=(app:express.Application)=>{
    app.get("/users",verify_token,index);
    app.post("/users",create);
    app.get("/users/:id",verify_token,show);
    app.post("/users/authenticate",authenticate);
   
}

export default userRoutes;