import { verify_token } from './user';
import {createProduct} from './../type/type'
import express,{Request,Response} from 'express';
import {  productStore } from '../models/product';

const store=new productStore();

const create=async(req:Request,res:Response)=>{
    try{
        const data:createProduct={
            id:req.body.id,
            name:req.body.name,
            price:req.body.price,
            category:req.body.specifications,
        }
        res.json(await store.create(data));
    }catch(error){
        res.json(error)
        res.status(400);
    }
}

const show=async (req:Request,res:Response) => {
    try{
        res.json(await store.show(req.params.id));
    }catch(error){
        res.status(400)
        res.json(error)
    }
}

const index=async (req:Request,res:Response)=>{
    try{
        res.json(store.index());
    }catch(error){
        res.json(error)
        res.status(400)
    }
}

const remove = async (req: Request, res: Response) => {
    try {
      const deleted_product = await store.delete(req.params.id);
      res.json(deleted_product);
    } catch (error) {
      res.status(400);
      res.json(error);
    }
  }

const productRoutes=(app:express.Application)=>{
    app.get('/product/:id',show);
    app.post('/product',verify_token,create);
    app.get('/product',index);
    app.delete("/products/:id", remove);
}

export default productRoutes;