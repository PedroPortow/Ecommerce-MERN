import React from 'react';
import { Link } from 'react-router-dom';
import CheckoutIconBadge from './CheckoutIconBadge/CheckoutIconBadge';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary-default text-white px-4 py-1 flex justify-between items-center shadow z-10 relative">
      <Link to="/shop" className="px-4 text-black hover:text-gray-800">
        <h1 className="text-xl font-semibold">Shop</h1>
      </Link>
      <div>
        <Link to="/checkout" className="px-4 ml-8 text-black hover:text-gray-800">
          <CheckoutIconBadge />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
