import { Router } from "express";
import userManager from "../../data/fs/UserManager.js";

const usersRouter = Router();

usersRouter.get("/register", async (req, resp, next) => {
  try {
    const users = await userManager.read();
    return resp.render("register", { users: users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, resp, next) => {
  try {
    const users = await userManager.read();
    return resp.render("users", { users: users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, resp, next) => {
    try {
      const { uid } = req.params;
      const one = await userManager.readOne(uid);
      return resp.render("detailsUser", { users: one });
    } catch (error) {
      return next(error);
    }
  });

export default usersRouter;


