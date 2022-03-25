const express = require("express");
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { getAllInventoryItems, getSingleInventoryItem, getInventoryForSingleWarehouse, postNewInventoryItem, updateInventoryItem, deleteInventoryItem } = inventoryController;

router
    .route('/')
    .get(getAllInventoryItems)
    .post(postNewInventoryItem)

router
    .get('/:id', getSingleInventoryItem)

router
    .get('/warehouse/:warehouseId', getInventoryForSingleWarehouse)

router
    .patch('/edit/:id', updateInventoryItem)

router
    .delete('/delete/:id', deleteInventoryItem)

module.exports = router;
