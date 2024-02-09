import { Router, Request, Response } from "express";
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { verifyToken } from "../utils/verifyToken";
import mongoose from "mongoose";
import { verify } from "crypto";
import { authenticateAdmin } from "../middlewares/authenticateAdmin";

const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
});


router.post("/checkout", verifyToken, async (req: Request, res: Response) => {
  const { customerID, cartProducts } = req.body;
  
  console.log(cartProducts)
  try {
    const user = await UserModel.findById(customerID);
    
    if (!user) {
      return res.status(400).json("User not found");
    }

    const productIds = cartProducts.map(product => product._id);
    const products = await ProductModel.find({ _id: { $in: productIds } });

    

    let totalAmount = 0;
    cartProducts.forEach(cartProduct => {
      const product = cartProducts.find(product => String(product._id) == cartProduct._id);
      
      if(product.stockQuantity < cartProduct.quantity){
        return res.status(400).json("Not enough stock")
      }

      totalAmount += cartProduct.price * cartProduct.quantity
    });

    if(user.availableMoney < totalAmount){
      return res.status(400).json("Not enough money ")
    }

    user.availableMoney -= totalAmount
    user.purchasedItems.push(...productIds)
    
    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIds } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json("")
  } catch (error) {
    console.error(error);
  }
});

router.put("/edit/:productId", verifyToken, authenticateAdmin, async (req: Request, res: Response) => {
  const { productId } = req.params; 
  const { name, price, description, imageUrl, stockQuantity } = req.body; 

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { name, price, description, imageUrl, stockQuantity },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", err });
  }
});

router.delete("/delete/:productId", verifyToken, authenticateAdmin, async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", err });
  }
});

router.get("/:productId", verifyToken, async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", err });
  }
});

router.post("/new", verifyToken, authenticateAdmin, async (req, res) => {
  const { name, price, description, imageUrl, stockQuantity }= req.body;

  try {
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists" });
    }
    
    const newProduct = new ProductModel({
      name,
      price,
      description,
      imageUrl,
      stockQuantity
    });
  
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ err });
  }
})


export { router as ProductRouter };
