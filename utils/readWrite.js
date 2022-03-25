const fs = require('fs');

const readWarehouses = () => {
    const warehouseData = fs.readFileSync("./data/warehouses.json");
    const parsedData = JSON.parse(warehouseData);
    return parsedData;
}

const readInventory = () => {
    const warehouseData = fs.readFileSync("./data/inventories.json");
    const parsedData = JSON.parse(warehouseData);
    return parsedData;
}

const writeWarehouses = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/warehouses.json', stringifiedData)
}

const writeInventory = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/inventories.json', stringifiedData)
}

module.exports = {
    readWarehouses,
    readInventory,
    writeWarehouses,
    writeInventory
}