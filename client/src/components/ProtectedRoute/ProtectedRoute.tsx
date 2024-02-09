import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useToken } from '@/hooks/useToken';
import Navbar from '../Navbar';

interface DecodedToken {
  exp?: number;
}

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { headers }= useToken()

  useEffect(() => {
    if (headers) {
      const decodedToken = jwtDecode<DecodedToken>(headers.authorization);
      
      if (decodedToken.exp === undefined) {
        navigate('/');
      } else {
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();
  
        if (isTokenExpired) {
          navigate('/');
        }
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
       <Navbar />
       <Outlet />
    </>
 
  );
};
