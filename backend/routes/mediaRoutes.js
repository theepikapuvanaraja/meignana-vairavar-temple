const express = require("express");

const router = express.Router();


const {

getMedia,

addMedia,

likeMedia,

deleteMedia


} = require("../controllers/mediaController");



router.get("/", getMedia);


router.post("/", addMedia);


router.put("/like/:id", likeMedia);


router.delete("/:id", deleteMedia);



module.exports = router;