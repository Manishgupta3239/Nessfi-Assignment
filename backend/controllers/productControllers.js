import { Product } from "../models/productModel.js";

export async function createProduct(req, res){ //create a product
    
    const { name,description,price,currency,category,brand,sku, stock_quantity,images,tags,is_active} = req.body;

    if(!name || !price || !currency || !sku || !category || !sku || !stock_quantity || !is_active){
        return res.status(400).json({success:false , error: "name , price , currency , sku , category sku , stock_quantity , is_active are required"});
    }

    if (!name || typeof name !== 'string' || name.length > 255) {
    return res.status(400).json({ success: false, error: "Valid 'name' is required and must be less than 255 characters." });
    }

    if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ success: false, error: "Valid 'price' is required and must be greater than 0." });
    }

    if (!currency || typeof currency !== 'string') {
    return res.status(400).json({ success: false, error: "'currency' is required and must be a string." });
    }

    if (!category || typeof category !== 'string') {
    return res.status(400).json({ success: false, error: "'category' is required and must be a string." });
    }

    if (!sku || typeof sku !== 'string') {
    return res.status(400).json({ success: false, error: "'sku' is required and must be a string." });
    }

    if (stock_quantity === undefined || typeof stock_quantity !== 'number' || stock_quantity < 0) {
    return res.status(400).json({ success: false, error: "Valid 'stock_quantity' is required and must be 0 or more." });
    }

    if (typeof is_active !== 'boolean') {
    return res.status(400).json({ success: false, error: "'is_active' is required and must be a boolean." });
    }
    try{
        const existingProduct = await Product.findOne({sku});
        if(existingProduct){
            return res.status(409).json({success:false , error: " Product already exits"});
        }
        const newProduct = await Product.create({
            name,
            description,
            price,
            currency,
            category,
            brand,
            sku,
            stock_quantity,
            images,
            tags,
            is_active,
        })
        res.status(201).json({success:true , message:"Product created successfully" , newProduct});
    }catch(error){
        console.log("error in create products route",error.message);
        return res.status(500).json({error: "Internal server error"});
    }

}

export async function getProduct(req, res){ // get a product by  id
    try{
        const {id} = req.params
        const product = await Product.findById(id);
        if(! product){
            return res.status(404).json({success:false , error : "product not found"});
        }
        return res.status(200).json({success:true , product , message:"product found"})
    }catch(error){
        console.log("error in get product route ",error.message)
        return res.status(500).json({success:false , error: "internal server error"});
    }
}

export async function getProducts(req, res){ //get all products
    try{
        const page = parseInt( req.query.page) || 1
        const limit= parseInt( req.query.limit) || 10
        const skip = (page -1 ) * limit;
        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();


        if(! products){
            return res.status(404).json({success:false , error:"no product found"})
        }
        res.status(200).json({success: true,total,page,limit,products});
    }catch(error){
        console.log("error in get products route ",error.message);
        return res.status(500).json({success:true , error:"internal server error"});
    }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated", product: updatedProduct });
  } catch (error) {
    console.log("Error in updateProducts", error.message);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}


export async function deleteProduct(req, res){  //delete a product by id
    try{
        const id = req.params.id
        const response = await Product.findByIdAndDelete(id);
        if(! response){
            return res.status(404).json({success: false , error : "invalid product id"});
        }
    return res.status(200).json({ success: true, message: "Product deleted successfully" });

    }catch(error){
        console.log("error in delete product route", error.message);
        return res.status(500).json({success:false , error:"internal server error"});
    }
}