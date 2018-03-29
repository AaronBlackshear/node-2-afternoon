require('dotenv').config();
const express = require('express');
const {json} = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const ctrl = require('./products_controller');

const app = express();

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING).then(dbInstance => app.set('db', dbInstance)).catch(console.log);

app.get('/api/products', ctrl.getAll);
app.get('/api/product/:id', ctrl.getOne);
app.put('/api/product/:id/?', ctrl.update);
app.post('/api/product', ctrl.create);
app.delete('/api/product/:id', ctrl.delete);

const port = process.env.PORT || 3000
app.listen(port, () => `Listening on port ${port}`);