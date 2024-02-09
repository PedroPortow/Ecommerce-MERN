import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import PurchasedItems from "./pages/PurchasedItems";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ShopContextProvider } from "./context/ShopContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import { Toaster } from "@/components/ui/toaster"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <ShopContextProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/purchased-items" element={<PurchasedItems />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </ShopContextProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
