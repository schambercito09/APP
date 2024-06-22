import { Router } from "express";
import userManager from "../../data/fs/UserManager.js";

const usersRouter = Router();

usersRouter.get("/", read1);
usersRouter.get("/:uid", readOne1);
usersRouter.post("/", create1);
usersRouter.put("/:uid", update1);
usersRouter.delete("/:uid", destroy1);

async function read1(req, resp, next) {
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
    return next(error);
  }
}

async function readOne1(req, resp, next) {
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
    return next(error);
  }
}

async function create1(req, resp, next) {
  try {
    const data = req.body;
    const one = await userManager.create(data);

    return resp.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function update1(req, resp, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const one = await userManager.update(uid, data);
    return (
      resp.json /
      {
        statusCode: 200,
        message: "UPDATE ID: " + one.id,
      }
    );
  } catch (error) {
    return next(error);
  }
}

async function destroy1(req, resp, next) {
  try {
    const { uid } = req.params;
    const one = await userManager.destroy(uid);
    return resp.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;
