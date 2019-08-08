const express = require('express');
const morgan = require('morgan');

app.use(morgan('dev'));

const app = express();

app.use(express.static(__dirname + '/public'));
