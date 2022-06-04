const app = require("./Routes/products")
const port = 9008;
const mongodbconnection = require("./DBConnection/mongodb")

app.listen(port, ()=> {
    new mongodbconnection();
    console.log(`Server is running on port no ${port}`)
})