import { Router } from "express";
import apiRouter from "./api/index.api.js";
import indexViewsRouter from "./views/index.view.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/", indexViewsRouter)


export default indexRouter;


