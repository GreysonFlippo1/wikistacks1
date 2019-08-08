const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
//const layout = require('./views/layout.js')
const wikiRouter = require('./routes/wiki.js')
const userRouter = require('./routes/user.js')
// const { db } = require('./models');
const models = require('./models');
const app = express();

// db.authenticate()
//     .then(() => {
//         console.log('connected to the database');
//     });

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// app.get('/wiki', (req, res, next) => {
//     try {
//         res.send(layout());
//     } catch (err) {
//         console.log('error: ' + err)
//     }
// })

app.get('/', (req, res, next)=>{
    res.redirect('/wiki');
});


const PORT = 3000;

const init = async () => {
    await models.db.sync({force: true});
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`)
    });
}

init();

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
