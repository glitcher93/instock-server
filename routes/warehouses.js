const express = require("express");
const router = express.Router();
const warehouseController = require('../controllers/warehouseController')
const { getAllWarehouses, getSingleWarehouse, postNewWarehouse, updateWarehouse, deleteWarehouse } = warehouseController

router
    .route('/')
    .get(getAllWarehouses)
    .post(postNewWarehouse)

router
    .get('/:id', getSingleWarehouse)

router
    .patch('/edit/:id', updateWarehouse)

router
    .delete('/delete/:id', deleteWarehouse)

    module.exports = router;