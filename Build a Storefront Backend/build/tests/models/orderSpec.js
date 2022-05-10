"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const store = new order_1.orderStore();
const orders = {
    quantity: 8,
    user_id: 1,
    status: 'completed',
};
describe('Testing orders model table ', () => {
    let newOne;
    beforeAll(async () => {
        newOne = await store.create(orders);
    });
    describe('check declararion', () => {
        it('check create', () => {
            expect(store.create).toBeDefined();
        });
        it('check show', () => {
            expect(store.index).toBeDefined();
        });
        it('check show', () => {
            expect(store.show).toBeDefined();
        });
    });
    describe('order model', () => {
        it('check create', async () => {
            const data = {
                quantity: newOne.quantity,
                user_id: newOne.user_id,
                status: newOne.status,
            };
            expect(data.status).toEqual(orders.status);
        });
        it('check index', async () => {
            const result = await store.index();
            const orders = {
                quantity: 8,
                user_id: 1,
                status: 'completed',
            };
            expect(result[0].quantity).toEqual(orders.quantity);
        });
    });
});
