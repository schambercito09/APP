const fs = require("fs");
const crypto = require("crypto");


class ProductManager {
  constructor() {
    this.path = "./fs/files/products.json";
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
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      title:data.title,
      photo:
        data.photo ||
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        category:data.category,
        price:data.price,
        stock:data.stock,
    };

    if (!data.title || !data.category || !data.price || !data.stock) {
      console.log("No se creo el prodcuto, intentelo de nuevo.");
    } else {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      products.push(product);
      console.log("Producto Creado");
      products = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, products);
    }
  }
  async read() {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    return products;
    //agregar try catch y condicional en caso de no encontrar usuarios
  }
  async readOne(id) {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    return products.find((each) => each.id === id);
    //agregar try catch y condicional en caso de no encontrar el usuario
  }
  async destroy(id) {
    let products = await fs.promises.readFile(this.path, "utf-8");
    products = JSON.parse(products);
    const filtered = products.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    console.log(id + "eliminado");
    //agregar try catch y condicional en caso de no encontrar el usuario
  }
}

async function test() {
  const gestorDeProductos = new ProductManager();
  await gestorDeProductos.create({
    title:"zapatilla-white",
    photo: "zapatilla-white.jpg",
    category:"calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title:"remera-white",
    photo: "remera-white.jpg",
    category:"indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title:"pantalon-white",
    photo: "pantalon-white.jpg",
    category:"indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title:"gorra-white",
    photo: "gorra-white.jpg",
    category:"accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title:"guantes-white",
    photo: "guantes-white.jpg",
    category:"accesorios",
    price: 8,
    stock: 200,
  });
  await gestorDeProductos.create({
    title:"zapatilla-black",
    photo: "zapatilla-black.jpg",
    category:"calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title:"remera-black",
    photo: "remera-black.jpg",
    category:"indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title:"pantalon-black",
    photo: "pantalon-black.jpg",
    category:"indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title:"gorra-black",
    photo: "gorra-black.jpg",
    category:"accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title:"guantes-black",
    photo: "guantes-black.jpg",
    category:"accesorios",
    price: 8,
    stock: 200,
  });
  console.log( await gestorDeProductos.read());
  console.log( await gestorDeProductos.readOne("64b3f2c7496bf149c3903fa6"))

}
test();
