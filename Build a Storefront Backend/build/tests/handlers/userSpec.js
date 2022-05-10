"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const store = new user_1.UsersStore();
const temp = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
describe('check user handler api', () => {
    let result;
    let auth_token;
    beforeAll(async () => {
        result = await temp.post('/users').set({
            'Content-type': 'application/json',
        }).send({
            firstname: 'Krishna Goud',
            lastname: 'Laxmagouni',
            username: 'magic_user',
            password: 'password123',
        });
        auth_token = result.body;
    });
    it('User hanlder create', async () => {
        expect(result.status).toBe(200);
    });
    it('User handler index', async () => {
        const result = temp.get('/users').set('Authorization', auth_token);
        console.log('in user get user with auth_token', (await result).body);
        expect((await result).status).toBe(200);
    });
});
