const crypto = require("crypto");

class UserManager {
  static #users = [];

  create(data) {
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
      UserManager.#users.push(user);
      console.log("Usuario Creado");
    }
  }
  read() {
    try {
      let all = UserManager.#users;
      if (!all) {
        throw new Error("Usuarios no encontrados");
      } else {
        console.log(all);
        return all;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      let one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("Usuario no encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }
  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (filtered.length === UserManager.#users.length) {
        throw new Error("El usuario no fue encontrado");
      }
      UserManager.#users = filtered;
      console.log(id + " eliminado");
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
    }
  }

  
}

const usersManager = new UserManager();
usersManager.create({
  photo: "photo.png",
  email: "coder@gmail.com",
  password: "hola1234",
});
usersManager.create({
  photo: "photo2.png",
  email: "coder2@gmail.com",
  password: "hola12345",
});
usersManager.create({
  photo: "photo3.png",
  email: "coder3@gmail.com",
  password: "hola123456",
});
usersManager.create({
  photo: "photo4.png",
  email: "coder4@gmail.com",
  password: "hola1234567",
});

console.log(usersManager.read());
