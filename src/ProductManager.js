import express from "express"
import fs from "fs"
import { get } from "http"
//const { Blob } = require("buffer")

class ProductManager {

    constructor() {
        this.path = "../files/Products.json"
        this.products = []
    }

    getProducts = async () => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const result = JSON.parse(data)
            //console.log(result)
            return result
        }
        else {
            return []
        }
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

        const codeRepeated = await this.products.find((product) => product.code === code)
        if(codeRepeated) {
        console.log("Error: A product already exists for this code.")
        return

        }
        else{
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return product
        }
    }

    getProductById = async (productId) => {
        const products = await this.getProducts()
        let productById = products.filter(product => product.id === productId)

        if(productById == "") {
            console.log("Product not found")
        }
        else return productById
        console.log(productById)
    }


    updateProduct = async (productId, changes) => {
        const productById = await this.getProductById(productId) 

        if(productById == "") {
            console.log("Product not found")
        }
        else {
        const updatedProduct = {
            code: code ?? productById[0].code,
            title: title ?? productById[0].title,
            description: description ?? productById[0].description,
            price: price ?? productById[0].price,
            thumbnail: thumbnail ?? productById[0].thumbnail,
            stock: stock ?? productById[0].stock,
            id: id
        }

        products[id - 1] = updatedProduct

        
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, "\t"))
        return "Product Updated"
        }

    }


    deleteProduct = async (productId) => {

        const productById = await this.getProductById(productId)

        if (productById != undefined) {
            const products = await this.getProducts()
            const newArray = products.filter((product) => product.id != productId)

            await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"))
            console.log(newArray)
            return newArray
        }
    }


}

export default ProductManager