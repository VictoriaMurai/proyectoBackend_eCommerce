const socket = io()

let productsElem = document.getElementById("products")

socket.on("product_added", (product) => {
    let item = document.createElement("div")
    item.classList.add("gallery")
    item.innerHTML = `<h2>${product.title}<h2> <p>$${product.price}</p> <p>${product.description}</p>`;
    productsElem.appendChild(item);
})

socket.on("product_deleted", (productIndex) => {
    productsElem.removeChild(productsElem.children[productIndex]);
})


let user
let chatBox = document.getElementById("chatBox")


Swal.fire({
    title: "Login",
    input: "text",
    text: "Use your login name to communicate in the chat",
    inputValidator: (value) => {
        return !value && "You need to state a login name to continue"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
})

chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter") {
        if(chatBox.value.trim().length > 0) {
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs", (data) => {
    let log = document.getElementById("messageLogs")
    let messages = ""
    data.forEach((message) => {
        messages += `${message.user}: ${message.message} </br>`
    });
    log.innerHTML = messages
})







//socket.emit("message", "Hola")