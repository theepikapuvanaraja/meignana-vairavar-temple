const Media = require("../models/Media");


// GET ALL MEDIA
exports.getMedia = async (req, res) => {

try {

const data = await Media.find().sort({
createdAt:-1
});

res.json(data);


}catch(err){

res.status(500).json({
error:err.message
});

}

};



// ADD MEDIA
exports.addMedia = async (req,res)=>{

try{
console.log("MEDIA RECEIVED:", req.body);

const {title,description,url,type}=req.body;


const newMedia = new Media({

title,
description,
url,
type

});


await newMedia.save();


res.json(newMedia);



}catch(err){

res.status(500).json({
error:err.message
});

}

};




// LIKE / UNLIKE TOGGLE

exports.likeMedia = async(req,res)=>{

try{


const userId = req.body.userId;


const item = await Media.findById(req.params.id);



if(!item){

return res.status(404).json({
message:"Not found"
});

}



if(item.likedBy.includes(userId)){


item.likedBy =
item.likedBy.filter(
id=>id!==userId
);


}else{


item.likedBy.push(userId);


}



item.likes = item.likedBy.length;


await item.save();



res.json(item);



}catch(err){

res.status(500).json({
error:err.message
});

}

};




// DELETE

exports.deleteMedia = async(req,res)=>{

try{


await Media.findByIdAndDelete(req.params.id);


res.json({
message:"Deleted"
});


}catch(err){

res.status(500).json({
error:err.message
});

}

};