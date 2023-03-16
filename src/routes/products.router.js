import {Router} from "express"
//import {uploader} from "../utils.js"
import ProductManager from "../ProductManager.js"

const router = Router()


const productManager = new ProductManager()

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    let limit = req.query.limit
    products.splice(limit)
    res.send({products})
})

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid
    const productById = await productManager.getProductById(pid)
    if (!productById) {
        return res.send({error: "Product not found."})
    }
    else {
        res.send({productById})
    }
})

router.post("/", async (req, res) => {

    let product = req.body

    res = await this.addProduct(product)
    return res.status(201).send({status: "Success", message: "Product created"})

})

router.put("/:pid", async (req, res) => {
    const productId = req.params.id;
    const changes = req.body;

    res = await this.updateProduct(productId, changes)
    return res.status(201).send({status: "Success", message: "Product successfully updated"})
});

router.delete("/:pid", async (req, res) => {
    const productId = req.params.id;

    res = await this.deleteProduct(productId)
    return res.status(200).send({status: "Success", message: "Product deleted"})

});

export default router