import express from "express";
import userRouter from "./routes/user_routes.js";
import tableRouter from "./routes/table_routes.js";
import categoryRouter from "./routes/category_routes.js";
import itemRouter from "./routes/item_routes.js";
import containerRouter from "./routes/container_routes.js";
import warehouseLocationRouter from "./routes/warehouse_location_routes.js";
import fieldsRouter from "./routes/fields_routes.js";
import stockRouter from "./routes/stock_routes.js";
import stockLocationHistoryRouter from "./routes/stock_location_history_routes.js";
import bodyParser from "body-parser";
import { authorizeUser } from "./config/authorization.js";

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use("/users", userRouter);
app.use("/tables", authorizeUser, tableRouter);
app.use("/categories", authorizeUser, categoryRouter);
app.use("/items", authorizeUser, itemRouter);
app.use("/containers", authorizeUser, containerRouter);
app.use("/warehouse-locations", authorizeUser, warehouseLocationRouter);
app.use("/fields", authorizeUser, fieldsRouter);
app.use("/stocks", authorizeUser, stockRouter);
app.use("/stock-location-history", authorizeUser, stockLocationHistoryRouter);

export default app;
