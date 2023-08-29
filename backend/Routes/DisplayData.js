const express = require('express');
const router = express.Router()

router.post('/foodData',(req,res)=>{
    try {

        res.send([global.foodCategory,global.food_items]);
    } catch (error) {
        console.error(error.message);
        res.send("server error")
    }
})

module.exports= router;
