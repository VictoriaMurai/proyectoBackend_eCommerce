import express from "express"
import handlebars from "express-handlebars"
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import socketServer from "./socket.js"


const app = express()

app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")


app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use("/", viewsRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)


const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

socketServer.connect(httpServer)

