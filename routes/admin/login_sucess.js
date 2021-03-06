var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
var router = express.Router();
var registroModel = require('../../models/login_sucessModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    var registro = await registroModel.getRegistro();
    res.render('admin/login_sucess', {
        layout: 'admin/layout',
        usuario:req.body.user,
        registro
    });
    console.log(registro);
});

router.get('/agregar', (req, res, next) => {
   
    res.render('admin/agregar', {
        layout: 'admin/layout'
        
        })
   
});

router.post('/agregar', async (req, res, next) => {
    try {
        console.log(req.body);

        if (req.body.nombre != "" && req.body.apellido != "" && req.body.mail != "") {
            await registroModel.insertRegistro(req.body);
            res.redirect('/admin/login_sucess')
        } else {
            res.render('admin/agregar', {
                layout: 'admin/layout',
                error: true,
                message: 'todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'admin/layout',
            error: true,
            message: "No se cargo el registro"
        })
    }
});


module.exports = router;

