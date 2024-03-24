// const { nanoid } = require("nanoid");

let expenses = [];
let id = 0;

// https:localhost:5000/expense/create
function createExpense(req,res) {
    let {title,amount,date} = req.body;  // { id: 1, title: 'Tv', amount: '400', date: 2023-10-06T18:30:00.000Z }

    // title != null and title != undefined and title != ""
    if(!title) return res.status(400).send("Title not found.");
    if(!amount) return res.status(400).send("Amount not found.");
    if(!date) return res.status(400).send("Date not found.");

    date = new Date(date);
    expenses.push({id:id++,title,amount,date});
    console.log(expenses);
    return res.status(200).send("Expenses created successfully"); // sends the data and closes the connection
    
}

// http:localhost:5000/expense/get?year=2021

function getExpense(req,res) {
    let {year} = req.query;
    console.log("query",req.query); // { year: '2023' }

    if(!year){
        return res.status(400).send("Year param missing.");
    }
    let filteredExpense = expenses.filter(function(expense) {
        return expense.date.getFullYear()  === parseInt(year);
    })
    return res.status(200).send(filteredExpense);
}

// http:localhost:5000/expense/update/1
function updateExpense(req,res) {
    let {id} = req.params; // { id: '1' }
    
    if(!id) return res.status(400).send("Id param missing.");

    let {title,amount,date} = req.body;
    let expense = expenses.find((expense) => expense.id === parseInt(id));

    if(!expense) return res.status(404).send("Expense not found");

    if(title) expense.title = title;
    if(amount) expense.amount = amount;
    if(date) expense.date = new Date(date);

    return res.status(200).send("Expense updated..");

}

function deleteExpense(req,res) {
    let {id} =req.params;

    if(!id) return res.status(400).send("ID param missing.");

    let expense = expenses.find((expense) => expense.id === parseInt(id));
    if(!expense) return res.status(404).send("Expense not found");
    expenses = expenses.splice(expenses.indexOf(expense),1);
    console.log(expenses)
    return res.status(200).send("Expense deleted.");
}

module.exports = {
    createExpense,getExpense,updateExpense,deleteExpense
};