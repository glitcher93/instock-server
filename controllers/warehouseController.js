const readWarehouses = require("../utils/readWrite").readWarehouses;
const writeWarehouses = require("../utils/readWrite").writeWarehouses;
const { v4: uuidv4 } = require("uuid");

const getAllWarehouses = (req, res) => {
    const warehouseData = readWarehouses();
    res.status(200).json(warehouseData);
}

const getSingleWarehouse = (req, res) => {
    const warehouseData = readWarehouses();
    const warehouseId = req.params.id;
    const foundWarehouse = warehouseData.find(warehouse => warehouse.id === warehouseId)
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found")
    }
    res.status(200).json(foundWarehouse)
}