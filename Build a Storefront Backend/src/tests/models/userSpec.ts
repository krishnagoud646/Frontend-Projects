import { UsersStore } from '../../models/user';
import dotenv from 'dotenv';
import { User, showUser, newUser } from '../../type/type';


const store=new UsersStore();
dotenv.config();

const user:User={
    firstname:'Laxmagouni',
    lastname:'Krishna Goud',
    username:'magic_user',
    password:'password123'
}

let u:newUser;
beforeAll(async()=>{
    u=await store.create(user)
})


describe('User table',()=>{

    describe('check declararion',()=>{
        it('Create method',()=>{
            expect(store.create).toBeDefined();
        })
        it('Index method',()=>{
            expect(store.index).toBeDefined();
        })
        it('Show method',()=>{
            expect(store.show).toBeDefined();
        })
        it('check authenticate',()=>{
            expect(store.authenticate).toBeDefined();
        })
    })

    describe('Testing User table',()=>{

        it('create User',async()=>{
            
            expect({
                id:u.id,
                firstname:u.firstname,
                lastname:u.lastname,
                username:u.username,
                password:u.password
            }.firstname).toEqual({
                id:null,
                firstname:'Laxmagouni',
                lastname:'Krishna Goud',
                username:'magic_user',
                password:'password123'
                }.firstname);
        })

        

        it('User index',async()=>{
            const u=await store.index();
            expect(u[0].lastname).toEqual('Krishna Goud');
        })
        it('User show',async ()=>{
            expect((await store.show('1')).firstname).toEqual('Laxmagouni');
         }) 
        it("Authenticate",async()=>{
            const auth = {
                id:null,
                firstname:'Laxmagouni',
                lastname:'Krishna Goud',
                username:'magic_user',
                password:'password123'
                }
            const u=await store.authenticate(auth.username,auth.password)
        })

    })

})