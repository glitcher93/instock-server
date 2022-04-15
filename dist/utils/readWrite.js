"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeInventory = exports.writeWarehouses = exports.readInventory = exports.readWarehouses = void 0;
const fs_1 = __importDefault(require("fs"));
const readWarehouses = () => {
    const warehouseData = fs_1.default.readFileSync("./data/warehouses.json");
    const parsedData = JSON.parse(warehouseData.toString());
    return parsedData;
};
exports.readWarehouses = readWarehouses;
const readInventory = () => {
    const inventoryData = fs_1.default.readFileSync("./data/inventories.json");
    const parsedData = JSON.parse(inventoryData.toString());
    return parsedData;
};
exports.readInventory = readInventory;
const writeWarehouses = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs_1.default.writeFileSync('./data/warehouses.json', stringifiedData);
};
exports.writeWarehouses = writeWarehouses;
const writeInventory = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs_1.default.writeFileSync('./data/inventories.json', stringifiedData);
};
exports.writeInventory = writeInventory;
