import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from "express";
import { Warehouse } from "../utils/interfaces";
import { readWarehouses, writeWarehouses, readInventory, writeInventory } from '../utils/readWrite';

export const getAllWarehouses = (req: Request, res: Response) => {
    const warehouseData = readWarehouses();
    res.status(200).json(warehouseData);
}

export const getSingleWarehouse = (req: Request, res: Response) => {
    const warehouseData = readWarehouses();
    const warehouseId = req.params.id;
    const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouse.id === warehouseId)
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found")
    }
    res.status(200).json(foundWarehouse)
}

export const postNewWarehouse = (req: Request, res: Response) => {
    const { name, address, city, country, contact } = req.body;
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
    const phoneRegEx = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/g;
    if (!contact.phone.match(phoneRegEx) || !contact.email.match(emailRegEx)) {
        res.status(400).send("Phone and/or email address not formatted correctly")
    } else {
        const warehouseData = readWarehouses();
        const newWarehouse = {
            id: uuidv4(),
            name,
            address,
            city,
            country,
            contact: {
                name: contact.name,
                position: contact.position,
                phone: contact.phone,
                email: contact.email
            }
        };
        warehouseData.push(newWarehouse);
        writeWarehouses(warehouseData);
        res.status(201).json(newWarehouse);
    }
}

export const updateWarehouse = (req: Request, res: Response) => {
    const { name, address, city, country, contact } = req.body;
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
    const phoneRegEx = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/g;;
    console.log(contact.email.match(emailRegEx))
    console.log(contact.phone.match(phoneRegEx))
    if (!contact.phone.match(phoneRegEx) || !contact.email.match(emailRegEx)) {
        res.status(400).send("Phone and/or email address not formatted correctly")
    } else {
        const warehouseData = readWarehouses();
        const warehouseId = req.params.id;
        const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouse.id === warehouseId)
        if (!foundWarehouse) {
            res.status(404).send("Warehouse not found")
        }
        foundWarehouse.name = name || foundWarehouse.name;
        foundWarehouse.address = address || foundWarehouse.address;
        foundWarehouse.city = city || foundWarehouse.city;
        foundWarehouse.country = country || foundWarehouse.country;
        foundWarehouse.contact = contact || foundWarehouse.contact
        writeWarehouses(warehouseData);
        res.status(200).json(foundWarehouse);
    }
}

export const deleteWarehouse = (req: Request, res: Response) => {
    const warehouseData = readWarehouses();
    const inventoryData = readInventory();
    const warehouseId = req.params.id;
    const foundWarehouse = warehouseData.find((warehouse: Warehouse) => warehouseId === warehouse.id);
    const foundWarehouseIndex = warehouseData.findIndex((warehouse: Warehouse) => warehouseId === warehouse.id);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found");
    }
    for (let i = inventoryData.length - 1; i >= 0; i--) {
        if (inventoryData[i].warehouseID === warehouseId) {
            inventoryData.splice(i, 1);
        }
    }
    writeInventory(inventoryData);
    warehouseData.splice(foundWarehouseIndex, 1);
    writeWarehouses(warehouseData);
    res.status(200).json(foundWarehouse)
}