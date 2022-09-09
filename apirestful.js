const express = require('express');
const app = express();
const db = require("./main.js")

const { Router } = express;

const router = Router();

router.use(express.urlencoded());
router.use(express.json());

const DB = new db();

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