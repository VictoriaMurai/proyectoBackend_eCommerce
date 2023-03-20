import {Router} from "express"
//import {uploader} from "../utils.js"
import ProductManager from "../ProductManager.js"

const productRouter = Router()


const productManager = new ProductManager()

productRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    let limit = req.query.limit
    if (limit) {
        products.splice(limit)
        res.send(products)
    } else {
        res.send(products)
    }   
})

productRouter.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const productById = await productManager.getProductById(pid)
    if (!productById) {
        return res.send({error: "Product not found."})
    }
    else {
        res.send({productById})
    }
})

productRouter.post("/", async (req, res) => {

    const product = req.body

    await productManager.addProduct(product)
    return res.status(201).send({status: "Success", message: "Product created"})

})

productRouter.put("/:pid", async (req, res) => {
    const productId = req.params.id;
    const changes = req.body;

    await productManager.updateProduct(productId, changes)
    return res.status(201).send({status: "Success", message: "Product successfully updated"})
});

productRouter.delete("/:pid", async (req, res) => {
    const productId = req.params.id;

    await productManager.deleteProduct(productId)
    return res.status(200).send({status: "Success", message: "Product deleted"})

});

export default productRouter