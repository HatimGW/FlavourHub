const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    id:Number,
    Title:String,
    Price:Number,
    Descrpition:String,
    img:String,
    amount:Number,
})
const Item = mongoose.model("Item", schema)
 
module.exports=Item;
