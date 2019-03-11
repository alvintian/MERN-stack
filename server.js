const express= require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

const app=express();

//bodyparse middleware
app.use(bodyParser.json());

//db config
//const db=require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect('mongodb://localhost/MERN')
//mongoose.connection.once()
	.then(()=> console.log('Mongo db connected...'))
	.catch(err => console.log('connection error: ',err));

//use routes
app.use('/api/items',items);

	const port = process.env.PORT||5000;
	app.listen(port,()=> console.log(`server started on port ${port}`));