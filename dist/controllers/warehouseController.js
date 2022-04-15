"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouse = exports.updateWarehouse = exports.postNewWarehouse = exports.getSingleWarehouse = exports.getAllWarehouses = void 0;
const uuid_1 = require("uuid");
const readWrite_1 = require("../utils/readWrite");
const getAllWarehouses = (req, res) => {
    const warehouseData = (0, readWrite_1.readWarehouses)();
    res.status(200).json(warehouseData);
};
exports.getAllWarehouses = getAllWarehouses;
const getSingleWarehouse = (req, res) => {
    const warehouseData = (0, readWrite_1.readWarehouses)();
    const warehouseId = req.params.id;
    const foundWarehouse = warehouseData.find((warehouse) => warehouse.id === warehouseId);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found");
    }
    res.status(200).json(foundWarehouse);
};
exports.getSingleWarehouse = getSingleWarehouse;
const postNewWarehouse = (req, res) => {
    const { name, address, city, country, contact } = req.body;
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
    const phoneRegEx = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/g;
    if (!contact.phone.match(phoneRegEx) || !contact.email.match(emailRegEx)) {
        res.status(400).send("Phone and/or email address not formatted correctly");
    }
    else {
        const warehouseData = (0, readWrite_1.readWarehouses)();
        const newWarehouse = {
            id: (0, uuid_1.v4)(),
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
        (0, readWrite_1.writeWarehouses)(warehouseData);
        res.status(201).json(newWarehouse);
    }
};
exports.postNewWarehouse = postNewWarehouse;
const updateWarehouse = (req, res) => {
    const { name, address, city, country, contact } = req.body;
    const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g;
    const phoneRegEx = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/g;
    ;
    console.log(contact.email.match(emailRegEx));
    console.log(contact.phone.match(phoneRegEx));
    if (!contact.phone.match(phoneRegEx) || !contact.email.match(emailRegEx)) {
        res.status(400).send("Phone and/or email address not formatted correctly");
    }
    else {
        const warehouseData = (0, readWrite_1.readWarehouses)();
        const warehouseId = req.params.id;
        const foundWarehouse = warehouseData.find((warehouse) => warehouse.id === warehouseId);
        if (!foundWarehouse) {
            res.status(404).send("Warehouse not found");
        }
        foundWarehouse.name = name || foundWarehouse.name;
        foundWarehouse.address = address || foundWarehouse.address;
        foundWarehouse.city = city || foundWarehouse.city;
        foundWarehouse.country = country || foundWarehouse.country;
        foundWarehouse.contact = contact || foundWarehouse.contact;
        (0, readWrite_1.writeWarehouses)(warehouseData);
        res.status(200).json(foundWarehouse);
    }
};
exports.updateWarehouse = updateWarehouse;
const deleteWarehouse = (req, res) => {
    const warehouseData = (0, readWrite_1.readWarehouses)();
    const inventoryData = (0, readWrite_1.readInventory)();
    const warehouseId = req.params.id;
    const foundWarehouse = warehouseData.find((warehouse) => warehouseId === warehouse.id);
    const foundWarehouseIndex = warehouseData.findIndex((warehouse) => warehouseId === warehouse.id);
    if (!foundWarehouse) {
        res.status(404).send("Warehouse not found");
    }
    for (let i = inventoryData.length - 1; i >= 0; i--) {
        if (inventoryData[i].warehouseID === warehouseId) {
            inventoryData.splice(i, 1);
        }
    }
    (0, readWrite_1.writeInventory)(inventoryData);
    warehouseData.splice(foundWarehouseIndex, 1);
    (0, readWrite_1.writeWarehouses)(warehouseData);
    res.status(200).json(foundWarehouse);
};
exports.deleteWarehouse = deleteWarehouse;
