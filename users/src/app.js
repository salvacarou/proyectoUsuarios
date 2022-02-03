const express = require("express");
const session = require('express-session');
const path = require("path");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');

const app = express();
app.use(session({
    secret: 'Mensaje Secreto',
    resave: false,
	saveUninitialized: false,
}));

app.use(methodOverride("_method")); // Para capturar la info de los forms
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));

// Implementando EJS 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Rutas 
const users = require("./routes/userRoutes")
app.use("/", users)

app.listen(3001, () => console.log("Servidor esta corriendo en el puerto 3001"));

module.export = app; 