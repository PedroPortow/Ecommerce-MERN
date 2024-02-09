import React, { useContext } from 'react';
import { ShopContext } from '@/context/ShopContext'; // Ajuste o caminho conforme necessário
import { Button } from '@/components/ui/button';
import { usePostCheckout } from '@/hooks/usePostCheckout';

const Checkout: React.FC = () => {
  const { cartProducts, removeFromCart, updateCartProductCount } = useContext(ShopContext);

  const { postCheckout } = usePostCheckout();

  const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleDecreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      updateCartProductCount(quantity - 1, productId);
    } else {
      removeFromCart(productId); 
    }
  };

  const handleIncreaseQuantity = (productId: string, quantity: number) => {
    updateCartProductCount(quantity + 1, productId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div>
        {cartProducts.length > 0 ? (
          <ul>
            {cartProducts.map((product) => (
              <li key={product._id} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center">
                  <img src={product.imageUrl} alt={product.name} className="h-16 w-16 object-cover mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p>R$ {product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded-l"
                    onClick={() => handleDecreaseQuantity(product._id, product.quantity)}
                  >
                    -
                  </button>
                  <span className="px-4">{product.quantity}</span>
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded-r"
                    onClick={() => handleIncreaseQuantity(product._id, product.quantity)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your card is empty.</p>
        )}
      </div>
      <div className="text-right mt-4">
        <h3 className="text-2xl font-bold">Total: R$ {totalPrice.toFixed(2)}</h3>
        <Button onClick={() => postCheckout(cartProducts)}>Buy</Button>
      </div>
    </div>
  );  
};

export default Checkout;
