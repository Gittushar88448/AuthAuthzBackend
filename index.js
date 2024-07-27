const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 4000;

// middleware
app.use(cookieParser());
app.use(express.json());

// mounting
const router = require('./routes/route');
app.use('/api/v1', router);

const dbConnect = require('./config/database');
dbConnect();

app.listen(PORT , ()=>{
    console.log(`App started at ${PORT}`);
});

app.get('/' , (req , res)=> {
    res.send(`<h1> Hello Tushar </h1>`)
})

