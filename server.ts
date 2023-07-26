import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jsonServer from 'json-server';
import path from 'path';
import warehouseRoutes from './routes/warehouses';
import inventoryRoutes from './routes/inventories';

dotenv.config();

const PORT = process.env.PORT || 7400;

const app: Express = express();


app.use(express.json());
app.use(jsonServer.router('../data/inventories.json'));
app.use(jsonServer.router('../data/warehouses.json'));
app.use(cors());
app.use('/warehouses', warehouseRoutes);
app.use('/inventory', inventoryRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))