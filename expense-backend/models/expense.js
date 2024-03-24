let {Schema,model} = require('mongoose');

let expenseSchema = Schema({
    title : { type : String},
    amount : {type : Number},
    date : { type : Date}
})

module.exports = model("expenses",expenseSchema);