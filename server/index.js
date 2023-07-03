//imports in express from packages
const express = require('express');
const mongoose = require('mongoose');
//imports from other files
const authRouter = require("./routes/auth");
const adminRouter = require('./routes/admin');
const productRouter = require("./routes/product");
const userRouter = require('./routes/user');


//init
const PORT =process.env.PORT || 3000;
const app = express();
const DB = "mongodb+srv://prajapatigaurav355:happygaurav@cluster0.ds7e6uf.mongodb.net/?retryWrites=true&w=majority";
//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
//Connections
mongoose.connect(DB).then(()=>{
    console.log("Connection Eshtablished Successfully");
}).catch((e)=>{
    console.log(e);
});

//Creating an Api
//GET ,PUT ,POST, DELETE,UPDATE--> CRUD

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Connected at port ${PORT}`);
});
//localhost by default
