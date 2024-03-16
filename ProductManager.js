class ProductManager {
    static #products = [];
  
    create(data) {
      const product = {
        id:
          ProductManager.#products.length === 0
            ? 1
            : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
        
        title:data.title,
        photo: data.photo,
        category:data.category,
        price:data.price,
        stock:data.stock,
  
        
      };
      ProductManager.#products.push(product);
      console.log("productoCreado");
    }
    read(){
      return ProductManager.#products
    }
  }
  
  const gestorDeProductos = new ProductManager()
  gestorDeProductos.create({
    title:"zapatilla",
    photo: "zapatilla.jpg",
    category:"calzado",
    price: 100,
    stock: 1000,
  })
  
  gestorDeProductos.create({
    title:"remera",
    photo: "remera.jpg",
    category:"indumentaria",
    price: 20,
    stock: 500,
  })
  
  gestorDeProductos.create({
    title:"pantalon",
    photo: "pantalon.jpg",
    category:"indumentaria",
    price: 30,
    stock: 600,
  })
  
  gestorDeProductos.create({
    title:"gorra",
    photo: "goraa.jpg",
    category:"accesorios",
    price: 10,
    stock: 1200,
  })
  
  gestorDeProductos.create({
    title:"guantes",
    photo: "guantes.jpg",
    category:"accesorios",
    price: 8,
    stock: 200,
  })
  
  //crear 4 productos mas 
  
  console.log(gestorDeProductos.read())
  
  