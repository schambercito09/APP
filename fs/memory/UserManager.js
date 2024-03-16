const crypto = require ("crypto")

class UserManager {
    static #users = [];
  
    create(data) {
      const user = {
        id: crypto.randomBytes(12).toString("hex") ,
        photo: data.photo || "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password || !data.role)
      {console.log("No se creo el usurio, intentelo de nuevo.")}
      else{UserManager.#users.push(user)
        console.log("Usuario Creado")
      }
    }
    read(){
      return UserManager.#users
      //agregar try catch y condicional en caso de no encontrar usuarios
    }
    readOne(id){
     return UserManager.#users.find(each=>each.id===id);
     //agregar try catch y condicional en caso de no encontrar el usuario
    }
    destroy (id){
      const filtered = UserManager.#users.filter(each=> each.id!==id);
      UserManager.#users = filtered;
      console.log((id + "eliminado"));
      //agregar try catch y condicional en caso de no encontrar el usuario
    }
  }
  
  const usersManager = new UserManager()
  usersManager.create({
      photo: "photo.png",
      email:"coder@gmail.com",
      password:"hola1234",
  })
  usersManager.create({
    photo: "photo2.png",
    email:"coder2@gmail.com",
    password:"hola12345",
  })
  usersManager.create({
    photo: "photo3.png",
    email:"coder3@gmail.com",
    password:"hola123456",
  })
  usersManager.create({
    photo: "photo4.png",
    email:"coder4@gmail.com",
    password:"hola1234567",
  })

 
  
  console.log(usersManager.read())
  
  