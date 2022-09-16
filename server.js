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

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/index', (req, res) => {
    res.render('index.pug', {titulo: 'Usando Pug JS en Express'});
});

app.get('/index', (req, res) => {
    res.send('Hola mundo');
})
app.get('/urlparam', (req, res) => {
    res.send(req.query);
})
app.post('/urljson', (req, res) => {
    res.send(req.body);
})


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: 'DigitalOcean', birth_year: 2012},
        { name: 'Tux', organization: 'Linux', birth_year: 1996},
        { name: 'Moby Dock', organization: 'Docker', birth_year: 2013}
    ]
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/index', {
        mascots: mascots,
        tagline: tagline
    });
});

app.get('./about', (req, res) => {
    res.render('pages/about');
})


app.listen(8080, () => {
    console.log("Servidor listo")
})