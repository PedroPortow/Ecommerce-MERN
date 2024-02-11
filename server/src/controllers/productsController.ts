import { Request, Response } from "express";
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";

async function index(_: Request, res: Response): Promise<void> {
  try {
    const products = await ProductModel.find({});

    res.json({ products });
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function checkout(req: Request, res: Response): Promise<void> {
  // TODO: add better types here
  // TODO: move methods to model
  const { customerID, cartProducts } = req.body;

  try {
    const user = await UserModel.findById(customerID);

    if (!user) {
      res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
      return;
    }

    const productIDs = cartProducts.map((product) => product._id);
    const products = await ProductModel.find({ _id: { $in: productIDs } });

    let totalPrice = 0;
    for (const item in cartProducts) {
      console.log({ item });
      const product = products.find((product) => String(product._id) === item);
      if (!product) {
        res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
        return;
      }

      if (product.stockQuantity < cartProducts[item]) {
        res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
        return;
      }

      totalPrice += product.price * cartProducts[item];
    }

    if (user.availableMoney < totalPrice) {
      res.status(400).json({ type: "TODO: ADD PRODUCT ENUM ERRORS" });
      return;
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } },
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    res.status(500).send(error);
    console.error(error);
  }
}

async function update(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;
  const { name, price, description, imageUrl, stockQuantity } = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { name, price, description, imageUrl, stockQuantity },
      { new: true },
    );

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", err });
  }
}

async function deleteProduct(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", err });
  }
}

async function show(req: Request, res: Response): Promise<void> {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", err });
  }
}

async function create(req: Request, res: Response): Promise<void> {
  const { name, price, description, imageUrl, stockQuantity } = req.body;

  try {
    const existingProduct = await ProductModel.findOne({ name });
    if (existingProduct) {
      res
        .status(400)
        .json({ message: "Product with this name already exists" });
      return;
    }

    const newProduct = new ProductModel({
      name,
      price,
      description,
      imageUrl,
      stockQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export default { index, checkout, update, deleteProduct, show, create };
