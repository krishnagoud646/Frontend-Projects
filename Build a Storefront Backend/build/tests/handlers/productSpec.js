"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const store = new product_1.productStore();
const temp = (0, supertest_1.default)(server_1.default);
describe('Product handler', () => {
    let token;
    beforeAll(async () => {
        const result = temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            username: 'sample_user',
            firstname: 'Krishna Goud',
            lastname: 'Laxmagouni',
            password: 'password123'
        });
        token = (await result).body;
    });
    it('check create product api', async () => {
        const result = temp.post('/product').set('Authorization', token).send({
            name: 'best product',
            price: 7777,
            specifications: 'None'
        });
        expect((await result).status).toBe(200);
    });
    it('Product Handler show', async () => {
        expect((await temp.get('/product/1')).status).toBe(200);
    });
    it('Product Handler index', async () => {
        expect((await temp.get('/product')).status).toBe(200);
    });
});
