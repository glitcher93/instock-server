import fs from 'fs';
import { Item, Warehouse } from './interfaces';

export const readWarehouses = () => {
    const warehouseData = fs.readFileSync("./data/warehouses.json");
    const parsedData = JSON.parse(warehouseData.toString());
    return parsedData;
}

export const readInventory = () => {
    const inventoryData = fs.readFileSync("./data/inventories.json");
    const parsedData = JSON.parse(inventoryData.toString());
    return parsedData;
}

export const writeWarehouses = (data: Warehouse[]) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/warehouses.json', stringifiedData)
}

export const writeInventory = (data: Item[]) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/inventories.json', stringifiedData)
}