import express from "express";
import userRouter from "./routes/user_routes.js";
import categoryRouter from "./routes/category_routes.js";
import itemRouter from "./routes/item_routes.js";
import containerRouter from "./routes/container_routes.js";
import warehouseLocationRouter from "./routes/warehouse_location_routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/items", itemRouter);
app.use("/containers", containerRouter);
app.use("/warehouse-locations", warehouseLocationRouter);

export default app;
