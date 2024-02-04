import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface IConfirmationModal {
  handleDeleteProduct: (id: string | undefined) => void;
}

export interface IConfirmationModalHandles {
  openModal: () => void;
  closeModal: () => void;
}

const ConfirmationModal: React.ForwardRefRenderFunction<IConfirmationModalHandles, IConfirmationModal> = ({ }, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger>Open</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently remove this product.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
        {/* <AlertDialogAction onClick={() => handleDeleteProduct()}>Continue</AlertDialogAction> */}
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  );
};

export default ConfirmationModal;
