import express from 'express';
import { getAllInventoryItems, getSingleInventoryItem, getInventoryForSingleWarehouse, postNewInventoryItem, updateInventoryItem, deleteInventoryItem } from '../controllers/inventoryController';

const router = express.Router();

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

export default router;
