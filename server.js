const express = require('express');
const app = express();
const db = require("./main.js")

app.use(express.urlencoded());
app.use(express.json());

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


app.listen(8080, () => {
    console.log("Servidor listo")
})