import express from "express";
import userRouter from "./routes/user_routes.js";
import itemRouter from "./routes/item_routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/items", itemRouter);

export default app;
