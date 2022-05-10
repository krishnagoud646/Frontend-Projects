import { UsersStore } from '../../models/user';
import app from '../../server';
import request from 'superagent';
import supertest from 'supertest';
import client from '../../database';
import dotenv from 'dotenv';

const store=new UsersStore();
const temp=supertest(app);

dotenv.config();
describe('check user handler api',() => {
    let result:request.Response;
    let auth_token:string;
    beforeAll(async()=>{
        result=await temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            firstname:'Krishna Goud',
            lastname:'Laxmagouni',
            username:'magic_user',
            password:'password123',

        })
        auth_token=result.body;
    })
    it('User hanlder create',async()=>{
        expect(result.status).toBe(200)
    })

    it('User handler index',async()=>{
        const result=temp.get('/users').set('Authorization',auth_token);
         console.log('in user get user with auth_token',(await result).body)
        expect((await result).status).toBe(200)
    })

    
    
    
})