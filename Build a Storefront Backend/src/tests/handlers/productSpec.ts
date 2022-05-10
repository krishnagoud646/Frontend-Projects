import { productStore } from '../../models/product';
import supertest from 'supertest';
import app from '../../server';

const store=new productStore();

const temp = supertest(app);

describe('Product handler',()=>{
    let token:string;
    beforeAll(async()=>{
       const result=temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            username:'sample_user',
            firstname:'Krishna Goud',
            lastname:'Laxmagouni',
            password:'password123'
        })
        token=(await result).body;
    })

    it('check create product api',async ()=>{
        const result=temp.post('/product').set('Authorization',token).send({
           name:'best product',
           price:7777,
           specifications:'None'
        })  
        expect((await result).status).toBe(200)
})

    it('Product Handler show',async()=>{
        expect((await temp.get('/product/1')).status).toBe(200)
    })

    it('Product Handler index',async()=>{
        expect((await temp.get('/product')).status).toBe(200)
    })
})