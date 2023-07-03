const express = require("express")
const productRouter = express.Router();
const auth = require('../middlewares/auth');
const {Product} = require("../models/product");

productRouter.get("/api/products",auth,async(req,res)=>{
    try{
        // console.log(req.query.category);
        const products = await Product.find({category:req.query.category});
        res.json(products);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

//creating a api for search request 
productRouter.get("/api/products/search/:name",auth,async(req,res)=>{
    try{
        const product = await Product.find({
            name:{$regex:req.params.name,$options:"i"},
        });
        res.json(product);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
//creating api for rating the product
productRouter.post("/api/rate-product",auth,async(req,res)=>{
    try{
    const {id,rating} = req.body; //here the id gives the product id not user id
    let product = await Product.findById(id);

    for(let i =0;i<product.ratings.length ; i++){
        if(product.ratings[i].userId == req.user ){
            product.ratings.splice(i,1);
            break;
        }
    }

    const ratingSchema = {
        userId: req.user,
        rating
    };
    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

productRouter.get('/api/deal-of-day',auth,async(req,res)=>{
    try{
        let product = await Product.find({});
        product.sort((a,b)=>{
            let aSum = 0;
            let bSum = 0;
            for(let i =0 ;i<a.ratings.length;i++){
                aSum += a.ratings[i].rating;
            }
            for(let i =0 ;i<b.ratings.length;i++){
                bSum += b.ratings[i].rating;
            }
            return aSum < bSum ? 1 : -1;
        });
        res.json(product[0]);
    }catch(e){
        res.status(500).json({error:e.message});
    }
});

module.exports = productRouter;