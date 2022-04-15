"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inventoryController_1 = require("../controllers/inventoryController");
const router = express_1.default.Router();
router
    .route('/')
    .get(inventoryController_1.getAllInventoryItems)
    .post(inventoryController_1.postNewInventoryItem);
router
    .get('/:id', inventoryController_1.getSingleInventoryItem);
router
    .get('/warehouse/:warehouseId', inventoryController_1.getInventoryForSingleWarehouse);
router
    .patch('/edit/:id', inventoryController_1.updateInventoryItem);
router
    .delete('/delete/:id', inventoryController_1.deleteInventoryItem);
exports.default = router;
