import fs from "fs";
import crypto from "crypto";

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
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
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password || !data.role) {
        throw new Error("Faltan datos para crear el usuario");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("Usuario Creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
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

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const filtered = users.filter((each) => each.id !== id);

      if (filtered.length === users.length) {
        throw new Error("El usuario no fue encontrado");
      } else {
        await fs.promises.writeFile(this.path, JSON.stringify(filtered));
        console.log(id + " eliminado");
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  const usersManager = new UserManager();
  await usersManager.create({
    photo: "photo.png",
    email: "coder@gmail.com",
    password: "hola1234",
    role: "user",
  });
  await usersManager.create({
    photo: "photo2.png",
    email: "coder2@gmail.com",
    password: "hola12345",
    role: "user",
  });
  await usersManager.create({
    photo: "photo3.png",
    email: "coder3@gmail.com",
    password: "hola123456",
    role: "user",
  });
  await usersManager.create({
    photo: "photo4.png",
    email: "coder4@gmail.com",
    password: "hola1234567",
    role: "user",
  });
  console.log(await usersManager.read());
  console.log(await usersManager.readOne("64b3f2c7496bf149c3903fa6"));
}
//test();
const userManager = new UserManager();
export default userManager;
