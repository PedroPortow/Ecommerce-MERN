import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/interfaces/IProduct";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { usePostProduct } from "@/hooks/usePostProduct";
import { useToast } from "@/components/ui/use-toast";
import { useEditProduct } from "@/hooks/useEditProduct";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";


function AdminDashboard() {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stockQuantity, setStockQuantity] = useState<number>();
  const [open, setOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<IProduct>();

  const { products, fetchProducts } = useGetProducts();
  const { editProduct } = useEditProduct();
  const { postProduct } = usePostProduct(); 
  const { deleteProduct } = useDeleteProduct();
  const { toast } = useToast();

  const handlePostProduct = async () => {
    try {
      const newProduct = {
        productName,
        price,
        imageUrl,
        description,
        stockQuantity,
      };
      const res = await postProduct(newProduct);
      toast({
        title: "Product Created Sucessfully!!!",
        description: `New ${productName} created.`,
      })
      clearInputs();
      fetchProducts();
    } catch (error) {
      console.error("Erro ao postar produto:", error);
    } 

    setOpen(false)
  };

  const clearInputs = () => {
    setProductName("");
    setPrice(undefined);
    setImageUrl("");
    setDescription("");
    setStockQuantity(undefined);
    setEditingProduct(undefined);
  }

  const handleDeleteProduct = async (id: string | undefined) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }
  
  // const handleEditProduct = (id: string | undefined) => {
  //   try {
  //     await editProduct(id);
  //   }
  // }
  // console.log({products})
  
  return (
    <div className="flex flex-col bg-white">
      <div className="container mx-auto m-16">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <div className="flex flex-col gap-y-4">
                <div className="flex mt-4 flex-col gap-y-2">
                  <Label>Product Name</Label>
                  <Input
                    placeholder="MacBook air M1 Pro V2 Full HD Ultra SSD NVDIA PLUS"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  <Label>Price</Label>
                  <Input
                    placeholder="2,50"
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  <Label>Stock Quantity</Label>
                  <Input
                    placeholder="3"
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    type="number"
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  {/* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
                  <Label>Image URL</Label>
                  <Input
                    placeholder="http://mockimage.com.br/4"
                    onChange={(e) => setImageUrl(e.target.value)}
                    type="string"
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  {/* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
                  <Label>Description</Label>
                  <Input
                    placeholder="Very cool product"
                    onChange={(e) => setDescription(e.target.value)}
                    type="string"
                  />
                </div>
              </div>
              <div>
                {/* Why are margins working like that? no idea */}
                <Button className="mt-4" onClick={handlePostProduct} type="submit">
                  Save
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>

          <Table className="bg-white">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: IProduct) => {
                return (
                  <TableRow>
                    <TableCell className="font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>{product.imageUrl}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <i className="fa-solid fa-pencil" onClick={() => { 
                        handleEditProduct(product._id);
                      }}></i>
                    </TableCell>
                    <TableCell>
                      <i className="fa-solid fa-trash-can" onClick={() => handleDeleteProduct(product._id)}></i>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex flex-row gap-x-4 mt-4 justify-end">
            <DialogTrigger>
              <Button>+ New Product</Button>
            </DialogTrigger>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminDashboard;
