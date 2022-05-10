import supertest from 'supertest';
import app from '../../server';
import { orderStore } from '../../models/order';
import client from '../../database';

const store=new orderStore();
const temp=supertest(app);

describe('check api for orders',()=>{
    let token:string;
    beforeAll(async()=>{
       const result=await temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            userName:'sample_user',
            firstName:'Krishna Goud',
            lastName:'Laxmagouni',
            password:'password123'
        })
        token=result.body;
    })

    it('Order handler',async ()=>{
        const result=await temp.post('/orders')
        .set('Authorization',token)
        .send({
            user_id:1,
            quantity:8,
            status:'active'
        })  

        expect(result.status).toBe(200)
    })

    it('Order Handler index',async()=>{
        const orderIndex=await temp.get('/orders')
        expect(orderIndex.status).toBe(200)
    })


})
