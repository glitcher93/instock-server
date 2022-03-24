const readInventory = require("../utils/readWrite").readInventory;
const writeInventory = require("../utils/readWrite").writeInvereadInventory;
const readWarehouses = require("../utils/readWrite").readWarehouses;
const { v4: uuidv4 } = require("uuid");

const getAllInventoryItems = (req, res) => {
    const inventoryData = readInventory();
    res.status(200).json(inventoryData);
}