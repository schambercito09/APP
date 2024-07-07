import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/real", async (req, resp, next) => {
  try {
    const products = await productManager.read();
    return resp.render("products", { products: products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, resp, next) => {
  try {
    const { pid } = req.params;
    const one = await productManager.readOne(pid);
    return resp.render("details", { products: one });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
