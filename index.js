const { Contenedor } = require('./models/Contenedor');
const { Producto } = require('./models/Producto');

const path = './assets/productos.txt';
const contenedor = new Contenedor(path);


testSave = async () => {

    const product = new Producto(`Producto Prueba ${Math.floor(Math.random() * 1000) + 1}`
        , Math.floor(Math.random() * 1000) + 10000
        , 'codehouse.com/images/gonzalo-andrade.jpg'
    );
    const lastId = await contenedor.save(product);
    console.log(`Producto añadido con ID ${lastId}`);
}

main = async () => {

    try {
        // Inicialización de productos.
        const products = await contenedor.readFileContenedor();
        contenedor.setProducts(products);
        console.log(`Inicializado con ${contenedor.countProducts()} productos.`);

        const product = new Producto(`Producto Prueba ${Math.floor(Math.random() * 1000) + 1}`
            , Math.floor(Math.random() * 1000) + 10000
            , 'codehouse.com/images/gonzalo-andrade.jpg'
        );
        const lastId = await contenedor.save(product);
        console.log(`Producto añadido con ID ${lastId}`);

        console.log(contenedor.getById(2));
        
        console.log(contenedor.getById(-2));

        if (contenedor.getAll().length > 4) {
            await contenedor.deleteById(2); // Al borrar el dos, el siguiente repite el id por array.length (validar en el archivo Test)
        } 
        
        if (contenedor.getAll().length > 10) {
            await contenedor.deleteAll();
        }

        console.log(contenedor.getAll());
        

    } catch (err) {
        console.log('[main]', err);
    }

}

main();








