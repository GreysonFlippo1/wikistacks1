const express = require('express');
const router = express.Router();
const { Page } = require('../models');
// const { addPage } = require('../views');

//default syntax
//const { addPage } = require('../views/addPage.js');
const layout = require('../views/layout.js');
const addPage = require('../views/addPage.js');
const wikipage = require('../views/wikipage')


router.get('/', (req, res, next) => {
        try {
            res.send(layout());
        } catch (err) {
            console.log('error: ' + err)
        }
    })

router.post('/', async (req, res, next)=>{

    const body = req.body;

    const page = new Page({
        title: body.title,
        content: body.content,
        slug: body.title,
    });

    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        })
        res.send(wikipage(page))
    } catch (error) { next(error) }

    res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
