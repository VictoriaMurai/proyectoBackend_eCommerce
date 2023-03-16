import express from "express"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import __dirname from "./utils.js"


const app = express()

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

const server = app.listen(8080, () => {
    console.log("Listening on port 8080")
})

app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
