import fs from 'fs';

export default class ProductManagerFiles {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.lastProductId = 0;
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        } catch (error) {
            this.products = [];
            this.lastProductId = 0;
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data, 'utf8');
    }

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios.");
            return;
        }
        if (this.products.some(existingProduct => existingProduct.code === code)) {
            console.log("El código ya está en uso.");
            return;
        }
        const newProduct = {
            id: this.lastProductId + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(newProduct);
        this.lastProductId++;
        await this.saveProducts();
        console.log("Producto agregado:", newProduct);
    }

    async getProducts() {
        try {
         if(this.fileExists()){
             const contenidoString = await fs.promises.readFile(this.pathFile,'utf-8');
             const products = JSON.parse(contenidoString)
             return this.products;
         }else{
             throw new Error('no se pudieron obtener los productos')
         }
          
        } catch (error) {
         
        }
     }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            console.log(product);
            return product;
        } else {
            console.log('Producto no encontrado.');
        }
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            this.products[productIndex] = {
                ...this.products[productIndex],
                ...updatedFields,
                id: this.products[productIndex].id,
            };
            await this.saveProducts();
            console.log("Producto actualizado:", this.products[productIndex]);
        } else {
            console.log('Producto no encontrado.');
        }
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const deletedProduct = this.products.splice(productIndex, 1)[0];
            await this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.log('Producto no encontrado.');
        }
    }
}