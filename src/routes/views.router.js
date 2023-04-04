import { Router } from "express";
import ProductManager from "../ProductManager.js";

const viewsRouter = Router()

const productManager = new ProductManager

const products = await productManager.getProducts()

viewsRouter.get("/", async (req, res) => {
    res.render("home", {products})
})

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat", {})
})

viewsRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {products})
})

export default viewsRouter