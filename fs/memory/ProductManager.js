const crypto = require ("crypto")

class ProductManager {
    static #products = [];
  
    create(data) {
      const product = {
        id:crypto.randomBytes(12).toString("hex"),
        title:data.title,
        photo: data.photo || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        category:data.category,
        price:data.price,
        stock:data.stock,
  
        
      };
      if(!data.title || !data.category || data.price || data.stock)
      {console.log("No se creo el producto")}
      else{ ProductManager.#products.push(product)
        console.log("Se creo prodcuto");
      }
    }
    read(){
      return ProductManager.#products
      //agregar try catch y condicional en caso de no encontrar usuarios
    }
    readOne(id){
      return ProductManager.#products.find(each=>each.id===id);
      //agregar try catch y condicional en caso de no encontrar el usuario
     }
     dataestroy (id){
      const filtered = ProductManager.#products.filter(each=> each.id!==id);
      ProductManager.#products = filtered;
      console.log((id + "eliminado"));
      //agregar try catch y condicional en caso de no encontrar el usuario
    }
  }
  
  const gestorDeProductos = new ProductManager()
  gestorDeProductos.create({
    title:"zapatilla-white",
    photo: "zapatilla-white.jpg",
    category:"calzado",
    price: 100,
    stock: 1000,
  })
  
  gestorDeProductos.create({
    title:"remera-white",
    photo: "remera-white.jpg",
    category:"indumentaria",
    price: 20,
    stock: 500,
  })
  
  gestorDeProductos.create({
    title:"pantalon-white",
    photo: "pantalon-white.jpg",
    category:"indumentaria",
    price: 30,
    stock: 600,
  })
  
  gestorDeProductos.create({
    title:"gorra-white",
    photo: "gorra-white.jpg",
    category:"accesorios",
    price: 10,
    stock: 1200,
  })
  
  gestorDeProductos.create({
    title:"guantes-white",
    photo: "guantes-white.jpg",
    category:"accesorios",
    price: 8,
    stock: 200,
  })
  gestorDeProductos.create({
    title:"zapatilla-black",
    photo: "zapatilla-black.jpg",
    category:"calzado",
    price: 100,
    stock: 1000,
  })
  gestorDeProductos.create({
    title:"remera-black",
    photo: "remera-black.jpg",
    category:"indumentaria",
    price: 20,
    stock: 500,
  })
  gestorDeProductos.create({
    title:"pantalon-black",
    photo: "pantalon-black.jpg",
    category:"indumentaria",
    price: 30,
    stock: 600,
  })
  gestorDeProductos.create({
    title:"gorra-black",
    photo: "gorra-black.jpg",
    category:"accesorios",
    price: 10,
    stock: 1200,
  })
  gestorDeProductos.create({
    title:"guantes-black",
    photo: "guantes-black.jpg",
    category:"accesorios",
    price: 8,
    stock: 200,
  })
  
   
  
  console.log(gestorDeProductos.read())
  
  