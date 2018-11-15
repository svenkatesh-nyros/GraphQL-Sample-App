const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const schema = require('./schema/schema');
// mongoose connection using mLab (mongodb online)
mongoose.connect('mongodb://root:root123@ds261253.mlab.com:61253/graphql-sample');
mongoose.connection.once('open',() => {
	console.log('connected to database');
})

const app = express();
app.use(cors());
app.use('/test',(req, res)=>res.send('hello'))
app.use('/graphql',graphqlHTTP({
	schema,
	graphiql: true,
}))
app.listen(4000,()=>{
	console.log('now listening for requests on port 4000')
})