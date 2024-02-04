import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetProducts } from "@/hooks/useGetProducts";
import { IEditProduct, IProduct } from "@/interfaces/IProduct";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteProduct } from "@/hooks/useDeleteProduct";
import ProductModal, { IProductModalHandles } from "@/components/ProductModal/ProductModal";
import ConfirmationModal, { IConfirmationModalHandles } from "@/components/ConfirmationModal/ConfirmationModal";

function AdminDashboard() {
  const [editingProduct, setEditingProduct] = useState<IEditProduct | undefined>();
  const productModalRef = useRef<IProductModalHandles>(null);
  const confirmationModalRef = useRef<IConfirmationModalHandles>(null);

  const { products, fetchProducts } = useGetProducts();
  const { deleteProduct } = useDeleteProduct();

  const handleDeleteProduct = async (id: string | undefined) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  const openProductModal = () => {
    productModalRef.current?.openModal();
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="container mx-auto m-16">
          <ProductModal ref={productModalRef} editingProduct={editingProduct} fetchProducts={fetchProducts} clearEditingProduct={() => setEditingProduct(undefined)} />
          {/* <ConfirmationModal ref={confirmationModalRef} handleDeleteProduct={handleDeleteProduct} /> */}
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
                  <TableRow key={product._id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stockQuantity}</TableCell>
                    <TableCell>{product.imageUrl}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <i className="fa-solid fa-pencil" onClick={() => {  
                        setEditingProduct({
                          name: product.name,
                          stockQuantity: product.stockQuantity,
                          description: product.description,
                          imageUrl: product.imageUrl || "",
                          price: product.price || 0,
                          _id: product._id
                        })
                        openProductModal();
                      }}/>
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
            <Button onClick={openProductModal}>+ New Product</Button>
          </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
