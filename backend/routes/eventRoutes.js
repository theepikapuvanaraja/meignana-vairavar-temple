const express = require("express");
const router = express.Router();

const Event = require("../models/Event");


// GET EVENTS
router.get("/", async (req, res) => {

try{

const events = await Event.find();

res.json(events);

}catch(err){

res.status(500).json({
error: err.message
});

}

});



// ADD EVENT
router.post("/", async (req, res) => {

try {

console.log("BODY:", req.body);


if (!req.body || !req.body.title) {

return res.status(400).json({
error: "No data received",
});

}


const event = new Event(req.body);

const saved = await event.save();


res.status(201).json(saved);


} catch (err) {

console.log("ERROR:", err.message);

res.status(500).json({
error: "Save Failed"
});

}

});




// DELETE EVENT  👈 ADD THIS

router.delete("/:id", async (req,res)=>{

try{


const event = await Event.findByIdAndDelete(req.params.id);



if(!event){

return res.status(404).json({

error:"Event not found"

});

}



res.json({

success:true,

message:"Event Deleted"

});



}catch(err){


console.log(err);


res.status(500).json({

error:err.message

});


}


});



module.exports = router;