class UserManager {
    static #users = [];
  
    create(data) {
      const user = {
        id:
          UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1,
        photo: data.photo,
        email: data.email,
        password: data.password,
        role: 0,
      };
      UserManager.#users.push(user);
      console.log("usuarioCreado");
    }
    read(){
      return UserManager.#users
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
  //crear un usurio mas
  
  console.log(usersManager.read())
  
  