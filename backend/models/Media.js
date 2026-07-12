const mongoose = require("mongoose");


const MediaSchema = new mongoose.Schema({

title:String,

description:String,

type:String,

url:String,


likes:{
type:Number,
default:0
},


likedBy:[String]


},
{
timestamps:true
});


module.exports = mongoose.model("Media", MediaSchema);