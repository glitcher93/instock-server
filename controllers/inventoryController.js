const readInventory = require("../utils/readWrite").readInventory;
const writeInventory = require("../utils/readWrite").writeInvereadInventory;
const readWarehouses = require("../utils/readWrite").readWarehouses;
const { v4: uuidv4 } = require("uuid");

const getAllInventoryItems = (req, res) => {
    const inventoryData = readInventory();
    res.status(200).json(inventoryData);
}

const getSingleInventoryItem = (req, res) => {
    const inventoryData = readInventory();
    const inventoryId = req.params.id;
    const foundItem = inventoryData.find(item => item.id === inventoryId);
    if (!foundItem) {
        res.status(404).send("Item not found")
    }
    res.status(200).json(foundItem)
}

const postNewInventoryItem = (req, res) => {
    const inventoryData = readInventory();
    const warehouseData = readWarehouses();
    const {warehouseName, itemName, description, category, status, quantity} = req.body;
    const foundWarehouse = warehouseData.find(warehouse => warehouse.name === warehouseName);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!")
    }
    const newItem = {
        id: uuidv4(),
        warehouseID: foundWarehouse.id,
        warehouseName,
        itemName,
        description,
        category,
        status,
        quantity
    }
    inventoryData.push(newItem);
    writeInventory(inventoryData);
    res.status(201).json(newItem)
}

const updateInventoryItem = (req, res) => {
    const inventoryData = readInventory();
    const warehouseData = readWarehouses();
    const {warehouseName, itemName, description, category, status, quantity} = req.body;
    const foundWarehouse = warehouseData.find(warehouse => warehouse.name === warehouseName);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!")
    }
    const foundItem = inventoryData.find(item => item.id === req.params.id);
    foundItem.warehouseID = foundWarehouse.id || foundItem.warehouseID;
    foundItem.warehouseName = warehouseName || foundItem.warehouseName;
    foundItem.itemName = itemName || foundItem.itemName;
    foundItem.description = description || foundItem.description;
    foundItem.category = category || foundItem.category;
    foundItem.status = status || foundItem.status;
    if (status === 'Out of Stock') {
        foundItem.quantity = 0
    }
    foundItem.quantity = quantity || foundItem.quantity;
    res.status(201).json(foundItem)
}