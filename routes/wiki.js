const express = require('express');
const router = express.Router()

//default syntax
//const { addPage } = require('../views/addPage.js');
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');


router.get('/', (req, res, next) => {
        try {
            res.send(layout());
        } catch (err) {
            console.log('error: ' + err)
        }
    })

router.post('/',(req, res, next)=>{
    //const title = req.body.title;
    res.json(req.body);
    
});

router.get('/add', (req, res, next)=>{
    res.send(addPage());
});

module.exports = router;