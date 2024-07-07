import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json"; //modificar
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo creado");
    } else {
      console.log("Archivo ya Existe");
    }
  }

  async create(data) {
    try {
      if (!data.email || !data.password) {
        throw new Error("Faltan datos para crear el usuario");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          email: data.email,
          password: data.password,
          role: data.role || 0,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(user);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async read(ro) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);

      if (ro !== undefined) {
        users = users.filter((each) => each.role === ro);
      }

      if (users.length === 0) {
        return null;
      } else {
        return users;
      }
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const user = users.find((each) => each.id === id);
      if (user) {
        return user;
      } else {
        throw new Error("Usuario no encontrado");
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each.id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return one;
      } else {
        const error = new Error("Not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);

      if (filtered.length === users.length) {
        const error = new Error("not found!");
        error.statusCode = 404;
        throw error;
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(filtered));
        console.log(id + " eliminado");
      }
    } catch (error) {
      throw error;
    }
  }
}


const userManager = new UserManager();
export default userManager;

