import client from "../database";
import {order, createOrder} from '.././type/type'

export class orderStore{
    static create(arg0: number) {
        throw new Error('Method not implemented.');
    }
    async index():Promise<order[]>{
        try{
            const conn=await client.connect();

            const sql='SELECT * FROM Orders'

            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(error){
            throw new Error(`Error ${error}`);
        }
    }
    //show model 
    async show(id:string):Promise<order[]>{
        try{
            const conn=await client.connect();
            const sql=`SELECT * FROM Orders WHERE id=${id}`;
            const result=await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(error){
            throw new Error(`Error  ${error}`);
        }
    }
    //create model
    async create(o:createOrder):Promise<order>{
        try{
            const conn=await client.connect();
            const sql=`INSERT INTO Orders (quantity, user_id, status) VALUES (${o.quantity}, ${o.user_id}, '${o.status}') RETURNING *;`
            const result=await conn.query(sql);
            conn.release();
            return result.rows[0];
        }catch(error){
            throw new Error(`Error  ${error}`);
        }
    }
//delete model
   async delete(id:string):Promise<order>{
       try{
        const conn=await client.connect();
            const sql=`DELETE FROM Orders WHERE id=${id} RETURNING *`;
            const result=await conn.query(sql);
            conn.release();
            return result.rows[0];
       }catch(error){
           throw new Error(`Error ${error}`);
       }
   }
}