import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json"; //modificar
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
      if (!data.title || !data.category || !data.price || !data.stock) {
        throw new Error("Faltan datos para crear el producto");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
          category: data.category || general,
          price: data.price || 1,
          stock: data.stock || 1,
        };
        let all = await fs.promises.readFile(this.path, "utf-8");
        all = JSON.parse(all);
        all.push(product);
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
        return product;
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
        products = products.filter((each) => each.category === cat);
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

      return product;
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
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);

      if (filtered.length === products.length) {
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


const productManager = new ProductManager();
export default productManager;
