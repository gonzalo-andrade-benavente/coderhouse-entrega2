const { Contenedor } = require('../models/Contenedor');
const { Producto } = require('../models/Producto');


describe('Incluir un llamado de prueba a cade método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construido', () => {

    let path, contenedor;

    beforeAll( () => {
        path = './assets/productos.txt';
        contenedor = new Contenedor(path);  
    });

    test('save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.', async () => {

        const product = new Producto(   `Producto Prueba ${Math.floor(Math.random() * 1000)+1}`
                                        , Math.floor(Math.random() * 1000) + 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );

        const lastId = await contenedor.save(product);
       
        //expect(typeof lastId).toBe('number'); // Si el lastId es un número.
        //expect(lastId).toEqual(contenedor.countProducts()); // si el id del último agregado es igual a la cantidad de productos, puede fallar si se borra un producto.

        const lastProduct = contenedor.products[contenedor.countProducts()-1]; //último añadido.
        expect(lastId).toEqual(lastProduct.id); // si el id del último agregado es igual a la cantidad de productos.
    });

    test('getById(Number): Object - Recibe un id y devuelve el objeto con ese id. (product2)', async () => {
        
        const product = new Producto(   `Producto Prueba ${Math.floor(Math.random() * 1000)+1}`
                                        , Math.floor(Math.random() * 1000) + 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );

        const product2 = new Producto(   `Producto Prueba`
                                        , 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );
                                        
        const prd1 = await contenedor.save(product);
        const prd2 = await contenedor.save(product2);
        const prd3 = await contenedor.save(product);
        const prd4 = await contenedor.save(product);

        const findProduct = contenedor.getById(prd2);
        //expect(typeof findProduct).toBe('object'); // passOK
        expect(findProduct).toEqual({
            title: 'Producto Prueba'
            , price: 10000
            , thumbnail: 'codehouse.com/images/gonzalo-andrade.jpg'
            , id: prd2 
        });

    });

    test('getById(Number): Object - Recibe un id y devuelve null si no está.', async () => {

        const product = new Producto(   `Producto Prueba ${Math.floor(Math.random() * 1000)+1}`
                                        , Math.floor(Math.random() * 1000) + 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );
        await contenedor.save(product);
        await contenedor.save(product);
        await contenedor.save(product);
        await contenedor.save(product);
        await contenedor.save(product);

        const nullProduct = contenedor.getById(123456789);

        expect(nullProduct).toEqual(null);

    });

    test('getAll(): Objetct[] - Devuelve un array con los objetos presentes en el archivo.', async () => {

        const product = new Producto(   `Producto Prueba ${Math.floor(Math.random() * 1000)+1}`
                                        , Math.floor(Math.random() * 1000) + 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );
        await contenedor.save(product);

        expect(Array.isArray(contenedor.getAll())).toBe(true);

    });

    test('deleteById(Number): void - Elimina del archivo el objeto con el id buscado.', async () => {

        const product = new Producto(   `Producto Prueba ${Math.floor(Math.random() * 1000)+1}`
                                        , Math.floor(Math.random() * 1000) + 10000
                                        , 'codehouse.com/images/gonzalo-andrade.jpg' 
                                        );
        const idDelete = await contenedor.save(product);

        const totalProducts = contenedor.countProducts();

        contenedor.deleteById(idDelete);

        expect(totalProducts-1).toEqual(contenedor.countProducts());

    });

    test('deleteAll(): void - Elimina todos los objetos presentes en el archivo.', async () => {

        await contenedor.deleteAll();

        expect(contenedor.getAll()).toEqual([]);

    });

});

