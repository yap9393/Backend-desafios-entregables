
class ProductManager{
    constructor(){
        this.products=[];
        this.lastProductId = 0;
    }
    addProducts(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some(product =>  product.code === code)) {
            console.log("El código ya está en uso.");
            return;
        }
        const newProduct = {
            id: this.lastProductId+1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
        this.lastProductId++;
    }
    getProducts(){
        console.log(this.products)
    }
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product)
            return product;
        } else {
            console.log('Not found');
        }
    }

}
const manager1=new ProductManager();
console.log(manager1)
manager1.getProducts()
manager1.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
manager1.getProducts()
manager1.addProducts('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
manager1.getProductById(6)
manager1.getProductById(1)