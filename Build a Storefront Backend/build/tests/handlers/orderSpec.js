"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const order_1 = require("../../models/order");
const store = new order_1.orderStore();
const temp = (0, supertest_1.default)(server_1.default);
describe('check api for orders', () => {
    let token;
    beforeAll(async () => {
        const result = await temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            userName: 'sample_user',
            firstName: 'Krishna Goud',
            lastName: 'Laxmagouni',
            password: 'password123'
        });
        token = result.body;
    });
    it('Order handler', async () => {
        const result = await temp.post('/orders')
            .set('Authorization', token)
            .send({
            user_id: 1,
            quantity: 8,
            status: 'active'
        });
        expect(result.status).toBe(200);
    });
    it('Order Handler index', async () => {
        const orderIndex = await temp.get('/orders');
        expect(orderIndex.status).toBe(200);
    });
});
