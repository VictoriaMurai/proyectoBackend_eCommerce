import fs from "fs"

class ProductManager {

    constructor() {
        this.path = "./files/Products.json"
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
                return
            }
        }

        const codeRepeated = await this.products.find((product) => product.code === code)
        if(codeRepeated) {
            console.log("Error: A product already exists for this code.")
            return
        }
        else{
            products.push(product)
            fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
            return product
        }
    }

    getProductById = async (productId) => {
        const products = await this.getProducts()
        let productById = products.filter(product => product.id === productId)

        if(productById == "") {
            console.log("Product not found")
        }
        else return JSON.parse(productById)
        console.log(productById)
    }


    updateProduct = async (productId, changes) => {
        const products = await this.getProducts()
        const productById = products.filter(product => product.id === productId)
        





    }


    deleteProduct = async (productId) => {
        let products = await this.getProducts()
        const productById = products.filter(product => product.id === productId)

        if(productById == "") {
            console.log("Product not found")
        }
        else {
        let newArray = products.filter((array) => array != productById)
        this.products = newArray
        await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, "\t"))
        console.log(newArray)
        }
    }
}





export default ProductManager