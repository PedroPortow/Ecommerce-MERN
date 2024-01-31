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
  const { customerID, cartItems } = req.body;
  try {
    const user = await UserModel.findById(customerID);

    const productIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    if (!user) {
      return res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
    }
    if (products.length !== productIDs.length) {
      return res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        return res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    console.log(error);
  }
});

router.post("/new", verifyToken, authenticateAdmin, async (req, res) => {
  const { productName, price, description, imageUrl, stockQuantity }= req.body;

  try {
    const existingProduct = await ProductModel.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({ message: "Product with this name already exists" });
    }
    
    const newProduct = new ProductModel({
      productName,
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
