import fs from "fs"
import ProductManager from "./ProductManager.js"


const productManager = new ProductManager()

const env = async () => {

    let test1 = await productManager.getProducts()
    console.log(test1)

    const product1 = {
        title:"Test product 1",
        description: "This is test product 1",
        price: 200,
        thumnail: "No image",
        code: "abc123",
        stock: 25
    }

    const product2 = {
        title:"Test product 2",
        description: "This is test product 2",
        price: 450,
        thumnail: "No image",
        code: "def456",
        stock: 30
    }

    let test4 = await productManager.getProductById(4)
    console.log(test4)

    let result = await productManager.addProduct(product1)
    await productManager.addProduct(product2)
    console.log(result)

    let test2 = await productManager.getProducts()
    console.log(test2)

    let test3 = await productManager.deleteProduct(4)
    console.log(test3)

    let changes = {
        price: 1000,
        stock: 67
    }

}

env()