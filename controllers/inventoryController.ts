import { Request, Response } from "express";
import { Item, Warehouse } from "../utils/interfaces";
import { v4 as uuidv4 } from 'uuid';
import { readInventory, writeInventory, readWarehouses } from "../utils/readWrite";

export const getAllInventoryItems = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    res.status(200).json(inventoryData);
}

export const getSingleInventoryItem = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    const inventoryId = req.params.id;
    const foundItem = inventoryData.find((item: Item) => item.id === inventoryId);
    if (!foundItem) {
        res.status(404).send("Item not found")
    }
    res.status(200).json(foundItem)
}

export const getInventoryForSingleWarehouse = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    const warehouseData = readWarehouses();
    const warehouseId = req.params.warehouseId;
    const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouse.id === warehouseId);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!");
    };
    const inventory = inventoryData.filter((item: Item) => item.warehouseID === foundWarehouse.id);
    res.status(200).json(inventory);
}

export const postNewInventoryItem = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    const warehouseData = readWarehouses();
    const {warehouseName, itemName, description, category, status, quantity} = req.body;
    const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouse.name === warehouseName);
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

export const updateInventoryItem = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    const warehouseData = readWarehouses();
    const {warehouseName, itemName, description, category, status, quantity} = req.body;
    const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouse.name === warehouseName);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found!")
    }
    const foundItem = inventoryData.find((item: Item) => item.id === req.params.id);
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
    writeInventory(inventoryData);
    res.status(201).json(foundItem)
}

export const deleteInventoryItem = (req: Request, res: Response) => {
    const inventoryData = readInventory();
    const itemId = req.params.id;
    const foundItem = inventoryData.find((item: Item) => itemId === item.id);
    const foundItemIndex = inventoryData.findIndex((item: Item) => item.id === itemId);
    if (!foundItem) {
        res.status(404).send("Item not found!")
    }
    inventoryData.splice(foundItemIndex, 1)
    writeInventory(inventoryData)
    res.status(200).json(foundItem)
}