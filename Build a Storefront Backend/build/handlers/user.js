"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verify_token = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = require("../models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var store = new user_1.UsersStore();
dotenv_1["default"].config();
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log("handler user params", req.params.id);
                _b = (_a = res).json;
                return [4 /*yield*/, store.show(req.params.id)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var User, user, expass, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                User = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password
                };
                return [4 /*yield*/, store.create(User)];
            case 1:
                user = _a.sent();
                expass = user.password;
                token = jsonwebtoken_1["default"].sign({ expass: expass }, process.env.TOKEN_SECRET);
                res.json(token);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.json(error_1);
                res.status(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _b = (_a = res).json;
                return [4 /*yield*/, store.index()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, store.authenticate(req.body.username, req.body.password)];
            case 1:
                token = _a.sent();
                if (token == null) {
                    res.status(400);
                    res.send("invalid credentials");
                }
                else {
                    res.json(jsonwebtoken_1["default"].sign({ token: token }, process.env.TOKEN_SECRET));
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.json(error_3);
                res.status(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//middleware
function verify_token(req, res, next) {
    try {
        if (!req.headers.authorization) {
            res.status(401);
            res.json("no permision granted");
            return false;
        }
        var temp = req.headers.authorization;
        var dec = jsonwebtoken_1["default"].verify(temp, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied, Invalid Token".concat(error));
        return false;
    }
}
exports.verify_token = verify_token;
var userRoutes = function (app) {
    app.get("/users", verify_token, index);
    app.post("/users", create);
    app.get("/users/:id", verify_token, show);
    app.post("/users/authenticate", authenticate);
};
exports["default"] = userRoutes;
