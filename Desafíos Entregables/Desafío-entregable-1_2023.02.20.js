// Definición de la clase

class ProductManager {

    constructor() {
        this.products = []
    }

    addProduct = (title, description, price, thumnail, code, stock) =>{

        const product = {
            id: this.products.length +1,
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }

        const codeRepeated = this.products.find((product) => product.code === code)
        if(codeRepeated) {
            console.log("Error: A product already exists for this code.")
            return
        }

        for(const key in product) {
            if(product[key] === "") {
                console.log(`Error: ${key} is blank. All fields should be completed to add a new product.`)
                return
            }
        }

        this.products.push(product)
    }

    getProducts = () =>{
        return this.products
    }

    getProductById = (productId) => {
        let productById = this.products.filter(product => product.id === productId)

        if(productById == "") {
            console.log("Product not found")
        }
        
        else console.log(productById)
    }
}



// Instancia

const productManager = new ProductManager()

//console.log(productManager.getProducts())

productManager.addProduct("Test product 1", "This is test product 1", 200, "No image", "abc123", 25)
productManager.addProduct("Test product 2", "This is test product 2 with repeated code", 200, "No image", "abc123", 25)
productManager.addProduct("Test product 3", "This is test product 3 with empty field", "", "No image", "xyz789", 70)
productManager.addProduct("Test product 4", "This is test product 4", 150, "No image", "xyz789", 70)

productManager.getProducts()

productManager.getProductById(5)