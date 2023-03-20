import {Router} from "express"
import CartManager from "../cartManager.js"

const cartsRouter = Router()

const cartManager = new CartManager()

cartsRouter.post("/", async (req, res) => {

    const cart = req

    await cartManager.addCart(cart)
    return res.status(201).send({status: "Success", message: "Cart created"})
})

cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid
    const cartById = await cartManager.getCartById(cid)
    if (!cartById) {
        return res.send({error: "Cart not found."})
    }
    else {
        res.send({cartById})
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {

    const cid = req.params.cid
    const pid = req.params.pid

    await cartManager.addProductToCart(cid, pid)
    return res.status(201).send({status: "Success", message: "Product added to cart"})
})


export default cartsRouter