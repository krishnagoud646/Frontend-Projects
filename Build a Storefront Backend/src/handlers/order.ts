import express,{Request,Response} from 'express'
import dotenv from 'dotenv';
import { verify_token } from './user';
import { orderStore } from '../models/order';
import {order, createOrder} from '.././type/type'

const store=new orderStore();

dotenv.config();
const index=async (req:Request,res:Response)=>{
    try{
        const order = await store.index()
        res.json(order);
    }catch(error){
        res.json(error);
        res.status(400);
    }
}

const show=async (req:Request,res:Response)=>{
    try{
        res.json(await store.show(req.params.id))
    }catch(error){
        res.status(400)
        res.json(error);
    }
}


const create=async(req:Request,res:Response)=>{
    try{
        //console.log(req.body)
        const qty = parseInt(req.body.quantity)
        const userid = parseInt(req.body.user_id)
        const sts = req.body.status
        const data:createOrder={
            quantity: qty,
            user_id: userid,
            status: sts,
        }
        res.json(await store.create(data));
    }catch(error){
        res.status(400);
        res.json(error);
    }
}
const remove = async (req: Request, res: Response) => {
    try {
      const deleted_order = await store.delete(req.params.id);
      res.json(deleted_order);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }

const OrderRoutes=(app:express.Application) => {
    app.get('/orders/:id',show);
    app.get('/orders',index);
    app.post('/orders/:id',remove);
    app.post('/orders',verify_token,create)

}

export default OrderRoutes;