"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryItem = exports.updateInventoryItem = exports.postNewInventoryItem = exports.getInventoryForSingleWarehouse = exports.getSingleInventoryItem = exports.getAllInventoryItems = void 0;
const uuid_1 = require("uuid");
const readWrite_1 = require("../utils/readWrite");
const getAllInventoryItems = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    res.status(200).json(inventoryData);
};
exports.getAllInventoryItems = getAllInventoryItems;
const getSingleInventoryItem = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    const inventoryId = req.params.id;
    const foundItem = inventoryData.find((item) => item.id === inventoryId);
    if (!foundItem) {
        res.status(404).send("Item not found");
    }
    res.status(200).json(foundItem);
};
exports.getSingleInventoryItem = getSingleInventoryItem;
const getInventoryForSingleWarehouse = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    const warehouseData = (0, readWrite_1.readWarehouses)();
    const warehouseId = req.params.warehouseId;
    const foundWarehouse = warehouseData.find((warehouse) => warehouse.id === warehouseId);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!");
    }
    ;
    const inventory = inventoryData.filter((item) => item.warehouseID === foundWarehouse.id);
    res.status(200).json(inventory);
};
exports.getInventoryForSingleWarehouse = getInventoryForSingleWarehouse;
const postNewInventoryItem = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    const warehouseData = (0, readWrite_1.readWarehouses)();
    const { warehouseName, itemName, description, category, status, quantity } = req.body;
    const foundWarehouse = warehouseData.find((warehouse) => warehouse.name === warehouseName);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!");
    }
    const newItem = {
        id: (0, uuid_1.v4)(),
        warehouseID: foundWarehouse.id,
        warehouseName,
        itemName,
        description,
        category,
        status,
        quantity
    };
    inventoryData.push(newItem);
    (0, readWrite_1.writeInventory)(inventoryData);
    res.status(201).json(newItem);
};
exports.postNewInventoryItem = postNewInventoryItem;
const updateInventoryItem = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    const warehouseData = (0, readWrite_1.readWarehouses)();
    const { warehouseName, itemName, description, category, status, quantity } = req.body;
    const foundWarehouse = warehouseData.find((warehouse) => warehouse.name === warehouseName);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!");
    }
    const foundItem = inventoryData.find((item) => item.id === req.params.id);
    foundItem.warehouseID = foundWarehouse.id || foundItem.warehouseID;
    foundItem.warehouseName = warehouseName || foundItem.warehouseName;
    foundItem.itemName = itemName || foundItem.itemName;
    foundItem.description = description || foundItem.description;
    foundItem.category = category || foundItem.category;
    foundItem.status = status || foundItem.status;
    if (status === 'Out of Stock') {
        foundItem.quantity = 0;
    }
    foundItem.quantity = quantity || foundItem.quantity;
    (0, readWrite_1.writeInventory)(inventoryData);
    res.status(201).json(foundItem);
};
exports.updateInventoryItem = updateInventoryItem;
const deleteInventoryItem = (req, res) => {
    const inventoryData = (0, readWrite_1.readInventory)();
    const itemId = req.params.id;
    const foundItem = inventoryData.find((item) => itemId === item.id);
    const foundItemIndex = inventoryData.findIndex((item) => item.id === itemId);
    if (!foundItem) {
        res.status(404).send("Item not found!");
    }
    inventoryData.splice(foundItemIndex, 1);
    (0, readWrite_1.writeInventory)(inventoryData);
    res.status(200).json(foundItem);
};
exports.deleteInventoryItem = deleteInventoryItem;
