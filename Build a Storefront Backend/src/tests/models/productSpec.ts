import { productStore } from '../../models/product';
import { product,createProduct } from '../../type/type'

const store=new productStore();

describe('Testing product model',()=>{

    describe('check declararion',()=>{
        it('Test create method',()=>{
            expect(store.create).toBeDefined();
        })

        it('Test show method',()=>{
            expect(store.index).toBeDefined();
        })

        it('Test show method',()=>{
            expect(store.show).toBeDefined();
        })
    })

    let new_product:product;
    beforeAll(async ()=>{
        return new_product = await store.create({
        name: 'best product',
        price: 7777,
        category: 'None',
        id: 0
    });
    })

    describe('Product spec model ',()=>{
        it('Test create method',()=>{
            expect(new_product.price).toEqual(7777);
        })

        it('Test index method',async()=>{
            expect((await store.index())[0].name).toEqual('best product');
        })

        it('Test show method',async()=>{
            expect((await store.show('1'))[0].price).toEqual(7777);
        })
        // it('category',async () =>{
        //     expect(new_product.category).toEqual('None');
        // })


    })
})