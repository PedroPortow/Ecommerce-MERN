export interface IProduct {
  _id: string; 
  name: string;
  price: number; 
  imageUrl?: string; 
  description: string; 
  stockQuantity: number; 
}

export interface IEditProduct {
  name: string;
  price: number;
  imageUrl?: string;
  description: string;
  stockQuantity: number;
  _id: string;
}

export interface INewProduct {
  name: string;
  price: number;
  imageUrl?: string;
  description: string;
  stockQuantity: number;
}
