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

function AdminDashboard() {
  const { products } = useGetProducts();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [stockQuantity, setStockQuantity] = useState<number>();
  // TODO: Add paginação...

  const handlePostProduct = async () => {
  
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="container mx-auto m-16">
        <Dialog>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <div className="flex flex-col gap-y-4">
                <div className="flex mt-4 flex-col gap-y-2">
                  <Label>Product Name</Label>
                  <Input 
                    placeholder="MacBook air M1 Pro V2 Full HD Ultra SSD NVDIA PLUS"
                    onChange={e => setProductName(e.target.value)}
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  <Label>Price</Label>
                  <Input 
                    placeholder="2,50"
                    onChange={e => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  <Label>Stock Quantity</Label>
                  <Input 
                    placeholder="3"
                    onChange={e => setStockQuantity(Number(e.target.value))}
                    type="number"
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  { /* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
                  <Label>Image URL</Label>
                  <Input 
                    placeholder="http://mockimage.com.br/4"
                    onChange={e => setStockQuantity(Number(e.target.value))}
                    type="string"
                  />
                </div>
                <div className="flex  flex-col gap-y-2">
                  { /* TODO: ADD FILE INPUT TO IMAGE, CHANGE HOW IMAGES ARE HANDLED */}
                  <Label>Description</Label>
                  <Input 
                    placeholder="Very cool product"
                    onChange={e => setDescription(e.target.value)}
                    type="string"
                  />
                </div>
              </div>
              <div>
                {/* Why are margins working like that? no idea */}
                <Button className="mt-4" onClick={handlePostProduct}>Save</Button>
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
                      <i className="fa-solid fa-trash-can"></i>
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
