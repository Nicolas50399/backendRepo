const express = require('express');

const app = express();
const db = require("./main.js")

console.log(db)
app.get('/', (req, res) => {
    res.send({ error: false });
});





app.listen(8080, () => {
    console.log("Servidor listo para escuchar")
})