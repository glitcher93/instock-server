"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouseController_1 = require("../controllers/warehouseController");
const router = express_1.default.Router();
router
    .route('/')
    .get(warehouseController_1.getAllWarehouses)
    .post(warehouseController_1.postNewWarehouse);
router
    .get('/:id', warehouseController_1.getSingleWarehouse);
router
    .patch('/edit/:id', warehouseController_1.updateWarehouse);
router
    .delete('/delete/:id', warehouseController_1.deleteWarehouse);
exports.default = router;
