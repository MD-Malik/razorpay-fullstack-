const res = require("express/lib/response");
const { default: mongoose } = require("mongoose");
const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModel")

const getAllProducts = async (req, res, next) => {
    let response = await productModel.find({});
    res.status(200).json({ data : response})
}

const addToCart = async (req, res, next) => {
    let id = req.params.id;
    await cartModel.insertMany([{productId : id}]);
    res.status(200).json({message : "Added to cart successfully"});
}

const getCart = async (req, res, next) => {
    try {
        let cartDetails = await cartModel.find({});
        // console.log(cartDetails)
    var response = [];
    await cartDetails.forEach(async(item)=>{
        // console.log(item.productId)
         let result = await productModel.find({ _id: item.productId});
        // return result;
          response.push(result[0]);
        //  console.log(result[0])
        //  console.log(response)
    })
    let total = 0;
    setTimeout(() => {
      response.forEach(item=>{
        let price = +item.price || 0;
        total = total + price;
        // console.log(total)
    })
    }, 1000);
    // console.log(total)
    // console.log(response)
    setTimeout(() => {
        res.status(200).json({data : response, total : total})
    }, 2000);
    } catch (err) {
        console.log("error")
        res.json({ status : "error"})
    }
}

const confirmPayment = (req, res, next) => {
    console.log(req.params)
    res.render("home", {orderId : req.params.orderId, amount : req.params.amount})
}

const deleteCart = async(req, res, next) => {
    await cartModel.remove({});
    res.json({status : true});
}

module.exports = {
    getAllProducts,
    addToCart,
    getCart,
    confirmPayment,
    deleteCart
}