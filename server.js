const express = require('express');
const app = express();
//const db = require("./main.js")
const productosRouter = require('./apirestful')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/productos', productosRouter)

app.use("/", express.static(__dirname + "/public"));

/*
const DB = new db();

app.get('/productos', async (req, res) => {
    const data = await DB.getAll();
    res.send(data);
});

app.get('/productoRandom', async (req, res) => {
    const longitudObjetos = (await DB.getAll()).length;
    const { id } = Math.random()  * (longitudObjetos - 1) + 1;
    try{
        const data = await DB.getById(id);
        return res.send(data);
    }
    catch(e){
        return res.status(404).send({ error: true, msg: e.message })
    }
});
*/



app.listen(8080, () => {
    console.log("Servidor listo")
})