import express from "express"
import productRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import __dirname from "./utils.js"


const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

app.use("/api/products", productRouter)
app.use("/api/carts", cartsRouter)
