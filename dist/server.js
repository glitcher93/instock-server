"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const warehouses_1 = __importDefault(require("./routes/warehouses"));
const inventories_1 = __importDefault(require("./routes/inventories"));
dotenv_1.default.config();
const PORT = process.env.PORT || 7400;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/warehouses', warehouses_1.default);
app.use('/inventory', inventories_1.default);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
