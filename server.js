import express from "express";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";

//server
const server = express();
//se crea el server
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

//middelwares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"))
//obligo a mi servidor a usar la funcion encargada de leer parametros/consultas
//me permite leer req.params y req.query

//router

// endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
