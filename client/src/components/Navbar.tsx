import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  // TODO: Arrumar essa gambiarra feia, botar no protectedRoute
  if(location.pathname !== '/auth'){
    return (
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Shop</h1>
        <div>
          <Link to="/" className="px-4 hover:text-gray-300">Produtos</Link>
          <Link to="/checkout" className="px-4 hover:text-gray-300">
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </nav>
    );
  }

};

export default Navbar;
