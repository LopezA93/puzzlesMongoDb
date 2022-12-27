const express = require("express");
const PORT = 8081;
const app = express();
const session = require("express-session");

const MongoStore = require("connect-mongo");
const cors = require("cors");
app.use(cors({
  origin: "https://puzzlesmongodb.netlify.app",
}));
const productRoute = require("./routes/productos");
const userRoute = require("./routes/users");
const chatRoute = require("./routes/mensajes");
const ordenRoute = require("./routes/ordenes");
const cartRoute = require('./routes/carritos')
//socket
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer, {
  cors: {
    origin: "*",
  },
});



//Config
const connection = require("./database/config");
const passport = require("passport");
const mercadoPagoRouter = require("./routes/mercadopago");
connection();
require("dotenv").config();
require("./auth/auth");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Session
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    //Base de datos Mongo
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      mongoOptions,
      retries: 0,
      ttl: 600,
      cookie: {
        maxAge: 600,
      },
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(passport.initialize());

//Routes
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/chat", chatRoute);
app.use("/order", ordenRoute);
app.use("/cart", cartRoute)
app.use("/mercadopago", mercadoPagoRouter)

//
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido" });
});

app.get("*", (req, res) => {
  res.status(404).send(`Ruta: ${req.url} no encontrada`);
});

//Socket

socketServer.on("connection", (socket) => {
  socket.on("message", (mensaje) => {
    socket.broadcast.emit("message", {
      mensaje,
      email,
    });
  });

});


//Server On
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor online puerto:${PORT}`);
});

server.on("error", () => {
  console.log(error);
});
