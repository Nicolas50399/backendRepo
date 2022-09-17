const express = require('express');
const app = express();
const db = require("./main.js")

const { Router } = express;

const router = Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const DB = new db();

app.set('views', './views');

app.set('view engine', 'pug');

app.set('view engine', 'ejs');

/*
app.get('/indexPug', (req, res) => {
    res.render('indexPug.pug', { titulo: 'Usando Pug JS en Express' });
});

app.get('/indexPug', (req, res) => {
    res.send('Hola mundo');
})
app.get('/urlparam', (req, res) => {
    res.send(req.query);
})
app.post('/urljson', (req, res) => {
    res.send(req.body);
})




app.get('/', (req, res) => {
    var mascots = [
        { name: 'Sammy', organization: 'DigitalOcean', birth_year: 2012 },
        { name: 'Tux', organization: 'Linux', birth_year: 1996 },
        { name: 'Moby Dock', organization: 'Docker', birth_year: 2013 }
    ]
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('pages/indexPug', {
        mascots: mascots,
        tagline: tagline
    });
});*/

app.get('./indexEjs', (req, res) => {
    res.render('pages/indexEjs');
})


const bcrypt = require("bcrypt");
const handlebars = require("express-handlebars");


// * ---------------------FRONTEND-------------------------------------

app.get("/agregarProductos", (req, res) => {
    res.render("indexHbs", { layout: "agregarProductos" }); //*EN HANDLEBARS
    res.render("indexPug");//*EN PUG
    res.render('pages/indexEjs');//*EN EJS

});
app.get("/admin", async (req, res) => {
    const productos = await DB.getAll();
    res.render("indexHbs", { layout: "productos", productos });//*EN HANDLEBARS
});

app.get("/producto/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await DB.getById(id);
        res.render("indexHbs", { layout: "producto", ...data });//*EN HANDLEBARS
    } catch (e) {
        return res.status(404).render("indexHbs", { layout: "error" });//*EN HANDLEBARS
    }

    res.render("indexHbs", { layout: "productos", productos });//*EN HANDLEBARS
});

//*-------------------------REQUEST---------------------------------------


router.get('/', async (req, res) =>{
    const data = await DB.getAll();
    return res.send(data);
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const data = await DB.getById(id);
        return res.send(data);
    }
    catch(e){
        return res.status(404).send({ error: true, msg: e.message })
    }
})

router.post('/', async (req, res) => {
    const { producto } = req.body;
    try{
        const id = await DB.save(producto);

        return res.send({agregado: producto, id: id});
    }
    catch(e){
        return res.status(404).send({ error: true, msg: e.message })
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {producto} = req.body;
    const productos = await DB.getAll();
    const pos = productos.indexOf(await DB.getById(id))
    const anterior = productos[pos];
    productos[pos] = producto;
    res.send({actualizado: producto, anterior: anterior})
    
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const eliminado = await DB.getById(id);
        await DB.deleteById(id);
        return res.send({eliminado: eliminado});
    }
    catch(e){
        return res.status(404).send({ error: true, msg: e.message });
    }
})

module.exports = router