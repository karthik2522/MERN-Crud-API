const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended: false}))

// routes
app.use('/api/products', productroutes)

app.get('/', (req, res)=> {
    res.send("Hello From Node API Server updated new" )
});



app.get('/api/products', async(req, res)=> {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

app.get('/api/products/:id', async(req, res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
});


app.post('/api/products', async(req, res)=> {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
    
});


//upadte a Product
app.put('/api/products/:id', async(req,res)=>{
    try{
        const { id } = req.params;
         const product = await Product.findByIdAndUpdate(id,req.body);
        
         if (!product){
            return res.status(404).json({message: "Product not found"});
         }

         const updatedproduct = await Product.findById(id);

         res.status(200).json(updatedproduct);

    }catch(error){
        res.status(500).json({message: error.message})
    }
});


//Delete a Product
app.delete('/api/products/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }


         res.status(200).json({message:"Product Deleted Successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
});


mongoose.connect("mongodb+srv://karthikkarthik2522:SkgVq26bD900sthx@backenddb.oaohnco.mongodb.net/Node-API?retryWrites=true&W=majority")
  .then(() => {
    console.log('Connected to Database!');
    app.listen(3000, ()=>{
        console.log('Server is running on 3000')
    });  
})
.catch(() => {
    console.log('Connected to Failed!');
});