const fs = require("fs");
const crypto = require("crypto");


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
    //agregar estructura de try catch
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
      console.log("No se creo el usurio, intentelo de nuevo.");
    } else {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);
      console.log("Usuario Creado");
      users = JSON.stringify(users, null, 2);
      await fs.promises.writeFile(this.path, users);
    }
  }
  async read() {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users;
    //agregar try catch y condicional en caso de no encontrar usuarios
  }
  async readOne(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users.find((each) => each.id === id);
    //agregar try catch y condicional en caso de no encontrar el usuario
  }
  async destroy(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    const filtered = users.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    console.log(id + "eliminado");
    //agregar try catch y condicional en caso de no encontrar el usuario
  }
}

async function test() {
  const usersManager = new UserManager();
  await usersManager.create({
    photo: "photo.png",
    email: "coder@gmail.com",
    password: "hola1234",
    role:"user",
  });
  await usersManager.create({
    photo: "photo2.png",
    email: "coder2@gmail.com",
    password: "hola12345",
    role:"user",
  });
  await usersManager.create({
    photo: "photo3.png",
    email: "coder3@gmail.com",
    password: "hola123456",
    role:"user",
  });
  await usersManager.create({
    photo: "photo4.png",
    email: "coder4@gmail.com",
    password: "hola1234567",
    role:"user",
  });
  console.log( await usersManager.read());
  console.log( await usersManager.readOne("64b3f2c7496bf149c3903fa6"))

}
test();
