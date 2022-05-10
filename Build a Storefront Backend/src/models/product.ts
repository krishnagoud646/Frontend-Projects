// @ts-ignore
import client from "../database";
import {product,createProduct} from './../type/type'


export class productStore{
    // @ts-ignore
    async index():Promise<product[]>{
        try{
            const conn=await client.connect();
            const sql='SELECT * FROM Product'
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(error){
            throw new Error(`Could not product books. Error: ${error}`);
        }
    }

    //product show model
    async show(id:string):Promise<product[]>{
        try{
            // @ts-ignore
            const conn=await client.connect();
            const sql=`SELECT * FROM Product WHERE id=${id}`;
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(error){
            throw new Error(`Could not get products. Error: ${error}`);
        }
    }
    //Product create model
    async create(data:createProduct):Promise<product>{
        try{
            const conn=await client.connect();
            const sql=`INSERT INTO Product (name, price) VALUES ('${data.name}', '${data.price}')  RETURNING *`
            const result=await conn.query(sql);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`Error with create ${error}`);
        }
    }

////Product delete model
   async delete(id:string):Promise<product[]>{
       try{
            const conn=await client.connect();
            const sql=`DELETE FROM Product WHERE id=${id}`;
            // @ts-ignore
            const result=await conn.query(sql,[id]);
            conn.release();
            const product = result.rows[0]
            return product
       }catch(error){
           throw new Error(`Could not delete product ${id}. Error: ${error}`);
       }
   }
}