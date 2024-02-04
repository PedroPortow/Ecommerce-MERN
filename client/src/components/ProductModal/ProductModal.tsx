import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IEditProduct } from "@/interfaces/IProduct";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostProduct } from "@/hooks/usePostProduct";
import { useToast } from "@/components/ui/use-toast";
import { useEditProduct } from "@/hooks/useEditProduct";
import { INewProduct } from "@/interfaces/INewProduct";

interface IProductModal {
  editingProduct?: IEditProduct;
  fetchProducts: () => void;
  clearEditingProduct: () => void;
}

export interface IProductModalHandles {
  openModal: () => void;
  closeModal: () => void;
}

const ProductModal: React.ForwardRefRenderFunction<IProductModalHandles, IProductModal> = ({ editingProduct, fetchProducts, clearEditingProduct }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [description, setDescription] = useState<string | undefined>('');
  const [stockQuantity, setStockQuantity] = useState<number | undefined>(undefined);

  const { editProduct } = useEditProduct();
  const { postProduct } = usePostProduct(); 

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setImageUrl(editingProduct.imageUrl);
      setDescription(editingProduct.description);
      setStockQuantity(editingProduct.stockQuantity);
    } else {
      clearInputs();
    }
  }, [editingProduct]);

  useEffect(() => {
    if(!open){
      clearEditingProduct();
      clearInputs();
    }
  }, [open])

  const { toast } = useToast();

  console.log({editingProduct})

  useImperativeHandle(ref, () => ({
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }));

  const handlePostProduct = async () => {
    try {
      const newProduct: INewProduct = {
        name: name || "",
        price: Number(price),
        imageUrl,
        description: description || "",
        stockQuantity: Number(stockQuantity),
      };
      await postProduct(newProduct);
      toast({
        title: "Product Created Sucessfully!!!",
        description: `New ${name} created.`,
      })
      clearInputs();
      fetchProducts();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } 

    setOpen(false)
  };

  const clearInputs = () => {
    setName("");
    setPrice(undefined);
    setImageUrl("");
    setDescription("");
    setStockQuantity(undefined);
  }

  const handleEditProduct = async () => {
    if (editingProduct?._id) {
      try {
        const updatedProduct: IEditProduct = {
          _id: editingProduct?._id,
          name: name || "",
          price: Number(price),
          imageUrl,
          description: description || "",
          stockQuantity: Number(stockQuantity),
        };
        await editProduct(editingProduct?._id, updatedProduct);
        toast({
          title: "Product Updated Successfully",
          description: `Product ${name} has been updated.`,
        });
        clearInputs();
        fetchProducts(); 
        clearEditingProduct();
        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No product selected for editing");
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Product</DialogTitle>
        <div className="flex flex-col gap-y-4">
          <div className="flex mt-4 flex-col gap-y-2">
            <Label>Product Name</Label>
            <Input
              placeholder="MacBook air M1 Pro V2 Full HD Ultra SSD NVDIA PLUS"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex  flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              placeholder="2,50"
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
            />
          </div>
          <div className="flex  flex-col gap-y-2">
            <Label>Stock Quantity</Label>
            <Input
              placeholder="3"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              type="number"
              value={stockQuantity}
            />
          </div>
          <div className="flex  flex-col gap-y-2">
            {/* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
            <Label>Image URL</Label>
            <Input
              placeholder="http://mockimage.com.br/4"
              onChange={(e) => setImageUrl(e.target.value)}
              type="string"
              value={imageUrl}
            />
          </div>
          <div className="flex  flex-col gap-y-2">
            {/* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
            <Label>Description</Label>
            <Input
              placeholder="Very cool product"
              onChange={(e) => setDescription(e.target.value)}
              type="string"
              value={description}
            />
          </div>
        </div>
        <div>
          {/* Why are margins working like that? no idea */}
          <Button className="mt-4" onClick={editingProduct != undefined  ? handleEditProduct : handlePostProduct}>
            Save
          </Button>
        </div>
      </DialogHeader>
    </DialogContent>
    </Dialog>
  );
};

export default forwardRef(ProductModal);
