const express = require('express');
const app = express();
const db = require("./main.js")

app.use(express.urlencoded());
app.use(express.json());

const DB = new db();

console.log(db)
app.get('/productos', async (req, res) => {
    const data 
    res.send({ error: false });
});





app.listen(8080, () => {
    console.log("Servidor listo para escuchar")
})