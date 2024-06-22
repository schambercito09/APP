import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function read(req, resp, next) {
  try {
    const { category } = req.query;
    const all = await productManager.read(category);
    if (all) {
      return resp.status(200).json({
        response: all,
        category,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, resp, next) {
  try {
    const { pid } = req.params;
    const product = await productManager.readOne(pid);

    if (product) {
      return resp.status(200).json({
        success: true,
        data: product,
      });
    } else {
      resp.status(404).json({
        success: false,
        error: "NOT FOUND",
      });
    }
  } catch (error) {
    return next(error);
  }
}

async function create(req, resp, next) {
  try {
    const data = req.body;
    const one = await productManager.create(data);

    return resp.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, resp, next) {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await productManager.update(pid, data);
    return resp.json({
      statusCode: 200,
      message: "UPDATE ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, resp, next) {
  try {
    const { pid } = req.params;
    const one = await productManager.destroy(pid);
    return resp.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;

