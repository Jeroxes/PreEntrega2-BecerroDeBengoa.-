import ProductManager from "../services/ProductManager.js"

const productManager = new ProductManager()

const socketProducts = (socketServer) => {
  socketServer.on('connection', async(socket) => {
    console.log('conectado');
    
    const products = await productManager.getAllProducts()
    
    socketServer.emit('sendProducts', products)

    socket.on('addProduct', async(prod) => {
      productManager.addProduct(prod)
      const products = await productManager.getAllProducts()
      socketServer.emit('sendProducts', products)
    })

  })

}

export default socketProducts