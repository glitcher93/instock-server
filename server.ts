import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import warehouseRoutes from './routes/warehouses';
import inventoryRoutes from './routes/inventories';

dotenv.config();

const PORT = process.env.PORT || 7400;

const app: Express = express();


app.use(express.json());
app.use(cors())
app.use('/warehouses', warehouseRoutes);
app.use('/inventory', inventoryRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))