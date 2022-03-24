const readWarehouses = require("../utils/readWrite").readWarehouses;
const writeWarehouses = require("../utils/readWrite").writeWarehouses;
const { v4: uuidv4 } = require("uuid");

const getAllWarehouses = (req, res) => {
    const warehouseData = readWarehouses();
    res.status(200).json(warehouseData);
}