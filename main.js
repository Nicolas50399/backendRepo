const fs = require('fs');

class Contenedor {
    constructor(){
        this.file = './productos.txt';
    }

    async createFile(){//Crea el archivo, inicialmente vacio
        try {
            await fs.promises.writeFile(`${this.file}`, '[]');
            console.log('archivo creado exitosamente');
        }
        catch(e){
            console.log('no se pudo crear el archivo');
        }
    }

    async save(object){//Agrega un objeto al array del archivo
        const data = await fs.promises.readFile(
            `${this.file}`, 'utf-8'
           );
        const personas = JSON.parse(data);
        object.id = personas.length + 1;

        if(personas.some(unaPersona => unaPersona.id == object.id)){
            object.id = personas[personas.length-1].id + 1;
        }
        
        
        personas.push(object);
        const personaString = JSON.stringify(personas);

        try{
            await fs.promises.writeFile(
                `${this.file}`,`${personaString}`
            )
            console.log('Producto guardado exitosamente');
        }
        catch(e){
            console.log('No se pudo guardar al producto en el archivo');
        }

        return object.id;
    }

    async getById(id){//Devuelve un producto mostrandolo por consola
        const data = await fs.promises.readFile(
            `${this.file}`, 'utf-8'
           );
        const personas = JSON.parse(data);
        

        const personaBuscada = personas.find((unaPersona) => unaPersona.id == id)
        if(personaBuscada){
            console.log(personaBuscada);
            return personaBuscada;
        }
        else{
            const noEncontrado = "Producto no encontrado"
            console.log(noEncontrado);
            return noEncontrado;
        }
    }

    async getAll(){//Devuelve contenido el archivo mostrandolo por consola
        try{
            const data = await fs.promises.readFile(
                `${this.file}`, 'utf-8'
               );
            const personas = JSON.parse(data);
            console.log(personas);
            return personas;
        }
        catch(e){
            const noEncontrado = "No hay productos guardados"
            console.log(noEncontrado);
            return noEncontrado;
        }
    }

    async deleteById(id){//Quita el producto del array en el archivo
        const data = await fs.promises.readFile(
            `${this.file}`, 'utf-8'
           );
        const personas = JSON.parse(data);

        if(personas.some(unaPersona => unaPersona.id == id)){
            const personasActualizadas = JSON.stringify(personas.filter(unaPersona => unaPersona.id != id))
            try{
                await fs.promises.writeFile(
                    `${this.file}`, `${personasActualizadas}`
                )
                console.log("Producto borrado exitosamente")
            }
            catch(e){
                console.log('No se pudo borrar al producto')
            }
        }
        else{
            console.log('El producto no se encuentra en el archivo')
        }

    }

    async deleteAll(){//Vacia el array de productos en el archivo
        try{
            await fs.promises.writeFile(`${this.file}`, '[]')
            console.log('Productos borrados exitosamente')
        }
        catch(e){
            console.log('No se pudo borrar a los productos')
        }
    }
}



//-------------------------------------------TEST--------------------------------------------------------

//Productos de prueba
const notebook = {
    name: "Notebook",
    marca: "Lenovo",
    price: 25000
}
const televisor = {
    name: "Televisor",
    marca: "Samsung",
    price: 25000
}
const auriculares = {
    name: "Auriculares",
    marca: "Redragon",
    price: 25000
}


const contenedor = new Contenedor();

//Hay que usar las funciones una por una, ya que al ser asincronas no se van a ejecutar secuencialmente

contenedor.createFile();
//contenedor.save(notebook);
//contenedor.save(televisor);
//contenedor.save(auriculares);
//contenedor.getById(1)
//contenedor.getAll();
//contenedor.deleteById(2);
//contenedor.getAll();
//contenedor.deleteAll();

module.exports = Contenedor;