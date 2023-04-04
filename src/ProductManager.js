import express from "express"
import fs from "fs"
import { get } from "http"
//const { Blob } = require("buffer")
import socket from "./socket.js"

class ProductManager {

    constructor() {
        this.path = "./files/products.json"
        this.products = []
    }

    getProducts = async () => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            return result
        }
        else {
            return []
        }
    }

    getStaticProducts = () => {

        if(fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, "utf-8")
            const result = JSON.parse(data)
            return result
        }
        else {
            return []
        }
    }

    getProductById = async (productId) => {
        const products = await this.getProducts()
        let productById = products.filter(product => product.id === parseInt(productId))

        if(productById == "") {
            console.log("Product not found")
        }
        else return productById
        console.log(productById)
    }

    addProduct = async (product) => {

        const products = await this.getProducts()
        if(products.length === 0) {
            product.id = 1
        }
        else {
            product.id = products[products.length - 1].id + 1
        }

        for(const key in product) {
            if(product[key] === "") {
                console.log(`Error: ${key} is blank. All fields should be completed to add a new product.`)
                return products
            }
        }

        const codeRepeated = await this.products.find((product) => product.code == code)

        if(codeRepeated) {
        console.log("Error: A product already exists for this code.")
        return
        } else {
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))

            socket.io.emit("product_added", product)

            return product
        }
    }

    updateProduct = async (productId, changes) => {
        const productById = await this.getProductById(productId)

        if (productId === -1) {
            console.log("Product not found")
            return res.status(404).send({ status: "Error", message: "Product not found" });
        }
    
        if (changes.id) {
            return res
            .status(400)
            .send({ status: "Error", message: "Cannot update Product ID" });
        }
    
        const product = this.products[productById];
    
        const updatedProduct = {
            ...product,
            ...changes,
        };
    
        this.products.splice(productId, 1, updatedProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
        return "Product updated"
    }

    deleteProduct = async (productId) => {

        //const productId = req.params.id
        const products = await this.getProducts()
        const productIndex = products.findIndex((u) => u.id == productId)

        products.splice(productIndex, 1)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
        
        socket.io.emit("product_deleted", productIndex)
        
        return
    
    }
}

export default ProductManager