const mongoose = require('mongoose');

const cart = mongoose.Schema({
    productId : { type : String, required : true}
})


module.exports = mongoose.model("cart", cart)