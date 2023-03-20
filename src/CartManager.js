import express from "express"
import fs from "fs"
import { get } from "http"
import ProductManager from "./ProductManager.js"

class CartManager {

    constructor() {
        this.path = "./files/cart.json"
        this.carts = []
    }

    addCart = async () => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(data)

            let newCart = {
                id: carts[carts.length - 1].id + 1,
                products: []
            }
    
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
            return newCart
        }
    }

    getCartById = async (cartId) => {

        if(fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(data)

            let cartById = carts.filter(cart => cart.id === parseInt(cartId))

            if(cartById == "") {
                console.log("Cart not found")
            }
            else return cartById
        }
        else {
            return []
        }
    }

    addProductToCart = async (cartId, productId) => {
        const cartById = await this.getCartById(cartId)

        let productById = cartById.filter(product => product.id === parseInt(productId))

        if(!productById) {
            let newProduct =
            {
                id: productId,
                quantity: 1
            }
            cartById.push({newProduct})

        } else {
            let updatedProduct
            {
                productById.id = productId,
                productById.quantity = productById.quantity + 1
            }
            cartById.push(updatedProduct)
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(cartById, null, "\t"))
        return cartById
    }
}

export default CartManager