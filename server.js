require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 7400;
const warehouseRoutes = require('./controllers/warehouses');
const inventoryRoutes = require('./controllers/inventories')

app.use(express.json());
app.use(cors)
app.use('/warehouses', warehouseRoutes);
app.use('/inventory', inventoryRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))