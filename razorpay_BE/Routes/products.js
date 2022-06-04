
const express = require('express')
const app = express();
const cors = require("cors")
const productController = require("../Controller/productController")
const Razorpay = require("razorpay")
const { engine } = require('express-handlebars')

app.use(express.json([]));
app.use(cors())
app.get("/", productController.getAllProducts)
app.get("/addToCart/:id", productController.addToCart)
app.get("/getCart", productController.getCart)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

var instance = new Razorpay({
    key_id : 'rzp_test_CLdOm5ZLcd09ss',
    key_secret : 'Ik2zsuz8fm3HRaszjZ4e9hQK'
});

app.post('/create/orderId', (req, res)=> {
    var options = {
        amount : req.body.amount*100,
        currency : "INR",
        receipt : "rcp1"
    };
    instance.orders.create(options, function(err, order){
        console.log(order);
        res.send({orderId : order.id});
    })
})

app.get('/confirmPayment/:orderId/:amount', productController.confirmPayment)
app.delete('/deleteCart', productController.deleteCart)

module.exports = app;