import client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import {User,newUser,showUser} from './../type/type'


const saltRounds =process.env.saltRounds
const pepper = process.env.BCRYPT_PASSWORD
dotenv.config()

export class UsersStore{
    async index():Promise<showUser[]>{
        try{
            //@ts-ignore
            const conn=await client.connect();
            const sql = 'SELECT * FROM Users';
            conn.release();
            const user= (await conn.query(sql))
            return user.rows
        }catch(error){
            throw new Error(`error with User index ${error}`);
        }
    }

    async create(data:User):Promise<newUser>{
        try{
            // @ts-ignore
            const conn=await client.connect();
            
            const hash=bcrypt.hashSync(
                data.password+pepper,
                parseInt(saltRounds as string))
            const sql = `INSERT INTO Users (firstname, lastname, username, password) VALUES ('${data.firstname}', '${data.lastname}', '${data.username}', '${hash}') RETURNING *;`
            conn.release();
            const user = (await conn.query(sql)).rows[0];
            return user
        }catch(error){
            throw new Error(`unable create user (${data.username}): (${error}`);
        }
    }

    async show(id:string):Promise<showUser>{
        try{
            //@ts-ignoreX$
            const conn=await client.connect();
            const sql = `SELECT * FROM Users WHERE id=${id}`
            conn.release();
            const result = await conn.query(sql)
            return result.rows[0]
        }catch(error){
            throw new Error(`unable show user ${id}: ${error}`);
        }
    }
    
    async delete(id:string):Promise<User>{
        try{
             const conn=await client.connect();
             const sql = `DELETE FROM users WHERE id=${1}`
      
             const result = await conn.query(sql, [id])

             const product = result.rows[0]

             conn.release()

      return product
        }catch(error){
            throw new Error(`could'nt delete User ${error}`);
        }
    }

    async authenticate(username:string, password:string):Promise<User|null>{
        try{
            const sql = `SELECT * FROM Users WHERE username='${username}'`
            const conn=await client.connect();
            const result=await conn.query(sql);
            console.log(password+pepper)
            conn.release();
            if(result.rows.length>0){
                const user=result.rows[0];
                console.log(user)
                if(bcrypt.compareSync(password+pepper,user.password))
                {
                    return user;
                }
            }
            return null;
        }catch(error){
            throw new Error(`error is not authenticate user ${username} ${error}`)
        }
    }
}