
let Expense = require("./models/expense");

async function createExpense(req,res) {
    let {title , amount, date} = req.body;
    console.log(req.body)
    if(!title) return res.status(400).send("Title not found.");
    if(!amount) return res.status(400).send("Amount not found.");
    if(!date) return res.status(400).send("Date not found.");

    date = new Date(date);
    let expense = new Expense({
        title,amount,date
    });
    await expense.save();
    return res.send("Expense created successfully");
}

async function getExpense(req,res) {
    let {year} = req.query;
    if(!year) {
        const allExpense = await Expense.find({})
        return res.status(200).send(allExpense);
    }
    let expense = await Expense.find({
        date:{
            $gte : new Date(year,0,1),  // greater than or equal
            $lte : new Date(year,11,31) // less than or equal
        }
    });
    return res.status(200).send(expense);
}
 
async function updateExpense(req,res) {
    let {id} = req.params; // { id: '1' }
    
    if(!id) return res.status(400).send("Id param missing.");

    let body = req.body;

    try{
        let expense = await Expense.findByIdAndUpdate(id,body);
        if(!expense) return res.status(404).send("Expense not found");
    }
    catch(err){
        return res.status(500).send("Internal server Error");
    }

    // if(title) expense.title = title;
    // if(amount) expense.amount = amount;
    // if(date) expense.date = new Date(date);
    // await expense.save();

    return res.status(200).send("Expense updated..");
}

async function deleteExpense(req,res) {
    let {id} =req.params;

    if(!id) return res.status(400).send("ID param missing.");

    let expense = await Expense.findByIdAndRemove(id);

    if(!expense) return res.status(404).send("Expense not found");
    
    return res.status(200).send("Expense deleted.");
}

module.exports = {
    createExpense,getExpense,updateExpense,deleteExpense
};