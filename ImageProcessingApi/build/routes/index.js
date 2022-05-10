"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routeimg_1 = __importDefault(require("./routeimg"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('routes.index');
});
router.use('/images', routeimg_1.default);
exports.default = router;
