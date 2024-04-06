import express from "express";
import productManager from "./fs/files/ProductManager.js";
import userManager from "./fs/files/UserManager.js";
//server
const server = express();
//se crea el server
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middelwares
server.use(express.urlencoded({ extended: true }));
//obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
//me permite leer req.params y req.query

//router
server.get("/", async (req, resp) => {
  try {
    return resp.status(200).json({
      response: "CODER API",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      response: "CODER API ERROR",
      success: false,
    });
  }
});

server.get("/api/products", async (req, resp) => {
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
    console.error(error);
    return resp.status(error.statusCode || 500).json({
      response: error.message,
      success: false,
    });
  }
});

server.get("/api/users", async (req, resp) => {
  try {
    const { rol } = req.query;
    const all = await userManager.read(rol);
    if (all) {
      return resp.status(200).json({
        response: all,
        rol,
        success: true,
      });
    } else {
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return resp.status(error.statusCode || 500).json({
      response: error.message,
      success: false,
    });
  }
});

server.get("/api/products/:pid", async (req, resp) => {
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
    console.error("Error:", error);
    resp.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

server.get("/api/users/:uid", async (req, resp) => {
  try {
    const { uid } = req.params;
    const user = await userManager.readOne(uid);

    if (user) {
      return resp.status(200).json({
        success: true,
        data: user,
      });
    } else {
      resp.status(404).json({
        success: false,
        error: "NOT FOUND",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    resp.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});