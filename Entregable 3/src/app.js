import express from "express";
import ProductManagerFiles from "./persistence/productManagerFiles.js";
const manager=new ProductManagerFiles("./persistence/productos.json")


const port = 8080;

const app=express();

app.get('/products', async (req, res) => {
   const limit = req.query.limit;
   try {
     const products = await manager.getProducts();
     if (limit) {
       const limitedProducts = products.slice(0, limit);
       res.json(limitedProducts);
     } else {
       res.json(products);
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error al obtener productos' });
   }
 });
 
 app.get('/products/:pid', async (req, res) => {
   const productId = parseInt(req.params.pid);
   try {
     const product = await manager.getProductById(productId);
     if (product) {
       res.json(product);
     } else {
       res.status(404).json({ error: 'Producto no encontrado' });
     }
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Error al obtener producto' });
   }
 });

app.listen(port,()=>console.log('Servidor funcionando'))

