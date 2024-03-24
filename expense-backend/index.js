const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createExpense, getExpense, updateExpense, deleteExpense } = require('./expenseApi');

const app = express();
app.use(cors())

// Middleware - To do some operation when request hits the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) =>{
    console.log("Home page");
    res.send("<h1>Home Page </h1>");
})

// app.get('/about',(req,res) =>{
//     console.log('About Page');
//     res.send("<h1>About Page</h1>");
// })

// app.get('/about-me',(req,res) =>{
//     res.redirect('/about');
// })

// app.use((req,res) =>{
//     console.log('other Page');
//     res.status(404).send("<h1>404 Page not found </h1>");
// })

// app.get('/cse/a',(req,res) => res.send('get Request is called'));
// app.post('/cse/a',(req,res) => res.send('Post Request is called'));
// app.put('/cse/a',(req,res) => res.send("put request is called"));
// app.patch('/cse/a',(req,res) => res.send('Patch Request is called'));
// app.delete('/cse/a',(req,res) => res.send("Delete request is called"));

//TODO Mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/expense_tracker")
.then(() => console.log("Connected to DB"))
.catch((err) => console.log(err))

//TODO Create API for creating an expense
app.post('/expense/create',createExpense);

//TODO Create API for getting the expense
app.get('/expense/get',getExpense);

//TODO Create API for updating the expense
app.patch('/expense/update/:id',updateExpense);

//TODO Create API for deleting the expense
app.delete('/expense/delete/:id',deleteExpense);


app.listen(5000,() => {
    console.log("Server listening on port 5000");
})


// ! GET - To retrieve the data

// * Request - URL , Method , headers , query parameters

// ! POST -

// * Request - URL , Method , headers , query parameters , body

// ! PUT -

// * Request - URL , Method , headers , query parameters , body

// ! PATCH -

// * Request - URL , Method , headers , query parameters , body

// ! DELETE -

// * Request - URL , Method , headers , query parameters.
// * Response - status Code & body.

