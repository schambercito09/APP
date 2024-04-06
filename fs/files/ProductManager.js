import fs from "fs";
import crypto from "crypto";

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
    try {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo ||
          "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error("Faltan datos para crear el producto");
      } else {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto Creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      throw error;
    }
  }

  async read(cat) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
  
      // Verificar si se proporciona una categoría
      if (cat !== undefined) {
        // Filtrar productos por categoría
        products = products.filter(each => each.category === cat);
      }
  
      // Devolver todos los productos si no se proporciona ninguna categoría
      if (products.length === 0) {
        return null;
      } else {
        return products;
      }
    } catch (error) {
      throw error;
    }
  }
  
  

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);

      const product = products.find((each) => each.id === id);

      if (!product) {
        throw new Error("Producto no encontrado");
      } else {
        return product;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);

      if (filtered.length === products.length) {
        throw new Error("Producto no encontrado");
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
  const gestorDeProductos = new ProductManager();
  await gestorDeProductos.create({
    title: "zapatilla-white",
    photo: "zapatilla-white.jpg",
    category: "calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title: "remera-white",
    photo: "remera-white.jpg",
    category: "indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title: "pantalon-white",
    photo: "pantalon-white.jpg",
    category: "indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title: "gorra-white",
    photo: "gorra-white.jpg",
    category: "accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title: "guantes-white",
    photo: "guantes-white.jpg",
    category: "accesorios",
    price: 8,
    stock: 200,
  });
  await gestorDeProductos.create({
    title: "zapatilla-black",
    photo: "zapatilla-black.jpg",
    category: "calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title: "remera-black",
    photo: "remera-black.jpg",
    category: "indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title: "pantalon-black",
    photo: "pantalon-black.jpg",
    category: "indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title: "gorra-black",
    photo: "gorra-black.jpg",
    category: "accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title: "guantes-black",
    photo: "guantes-black.jpg",
    category: "accesorios",
    price: 8,
    stock: 200,
  });
  await gestorDeProductos.create({
    title: "zapatilla-grey",
    photo: "zapatilla-grey.jpg",
    category: "calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title: "remera-grey",
    photo: "remera-grey.jpg",
    category: "indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title: "pantalon-grey",
    photo: "pantalon-grey.jpg",
    category: "indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title: "gorra-grey",
    photo: "gorra-grey.jpg",
    category: "accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title: "guantes-grey",
    photo: "guantes-grey.jpg",
    category: "accesorios",
    price: 8,
    stock: 200,
  });
  await gestorDeProductos.create({
    title: "zapatilla-blue",
    photo: "zapatilla-blue.jpg",
    category: "calzado",
    price: 100,
    stock: 1000,
  });
  await gestorDeProductos.create({
    title: "remera-blue",
    photo: "remera-blue.jpg",
    category: "indumentaria",
    price: 20,
    stock: 500,
  });
  await gestorDeProductos.create({
    title: "pantalon-blue",
    photo: "pantalon-blue.jpg",
    category: "indumentaria",
    price: 30,
    stock: 600,
  });
  await gestorDeProductos.create({
    title: "gorra-blue",
    photo: "gorra-blue.jpg",
    category: "accesorios",
    price: 10,
    stock: 1200,
  });
  await gestorDeProductos.create({
    title: "guantes-blue",
    photo: "guantes-blue.jpg",
    category: "accesorios",
    price: 8,
    stock: 200,
  });
  console.log(await gestorDeProductos.read());
  console.log(await gestorDeProductos.readOne("64b3f2c7496bf149c3903fa6"));
}

//test()
const productManager = new ProductManager();
export default productManager;