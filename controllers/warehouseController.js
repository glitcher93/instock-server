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

const postNewWarehouse = (req, res) => {
    const { name, address, city, country, contact } = req.body;
    const emailRegEx = /\S+@\S+\.\S+/;
    const phoneRegEx = /^[+]?[1]?[\s]?[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4}$/;

    if (!contact.phone.match(phoneRegEx) && !contact.email.match(emailRegEx)) {
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