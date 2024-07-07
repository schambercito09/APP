import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const indexViewsRouter = Router();

indexViewsRouter.use("/products", productsRouter);
indexViewsRouter.use("/users", usersRouter);
indexViewsRouter.get("/", (req, resp, next) => {
  try {
    return resp.render("index", { title: "HOME" });
  } catch (error) {
    next(error);
  }
});

export default indexViewsRouter;



