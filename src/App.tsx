import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home2 from "./pages/Home2";
import Home3 from "./pages/Home3";
import Home4 from "./pages/Home4";
import Home5 from "./pages/Home5";
import Home6 from "./pages/Home6";
import Home7 from "./pages/Home7";
import Home8 from "./pages/Home8";
import Home9 from "./pages/Home9";
import Home10 from "./pages/Home10";
import Home11 from "./pages/Home11";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import FirearmCategories from "./pages/FirearmCategories";
import CategoryPage from "./pages/CategoryPage";
import Firearms from "./pages/Firearms";
import FirearmCategoryPage from "./pages/FirearmCategoryPage";
import FirearmDetail from "./pages/FirearmDetail";
import SearchResults from "./pages/SearchResults";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Shipping from "./pages/Shipping";
import FirearmsLicense from "./pages/FirearmsLicense";
import HowToBuy from "./pages/HowToBuy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/home3" element={<Home3 />} />
          <Route path="/home4" element={<Home4 />} />
          <Route path="/home5" element={<Home5 />} />
          <Route path="/home6" element={<Home6 />} />
          <Route path="/home7" element={<Home7 />} />
          <Route path="/home8" element={<Home8 />} />
          <Route path="/home9" element={<Home9 />} />
          <Route path="/home10" element={<Home10 />} />
          <Route path="/home11" element={<Home11 />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/firearm-categories" element={<FirearmCategories />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/firearms" element={<Firearms />} />
          <Route path="/firearm-category/:slug" element={<FirearmCategoryPage />} />
          <Route path="/firearm/:id" element={<FirearmDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/firearms-license" element={<FirearmsLicense />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
