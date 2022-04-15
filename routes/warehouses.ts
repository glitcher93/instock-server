import express from 'express';
import { getAllWarehouses, getSingleWarehouse, postNewWarehouse, updateWarehouse, deleteWarehouse } from '../controllers/warehouseController';

const router = express.Router();

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

export default router;