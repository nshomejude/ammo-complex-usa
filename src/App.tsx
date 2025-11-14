import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReviewProvider } from "@/contexts/ReviewContext";
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
import About2 from "./pages/About2";
import About3 from "./pages/About3";
import About4 from "./pages/About4";
import About5 from "./pages/About5";
import About6 from "./pages/About6";
import About7 from "./pages/About7";
import About8 from "./pages/About8";
import About9 from "./pages/About9";
import About10 from "./pages/About10";
import About11 from "./pages/About11";
import Shipping from "./pages/Shipping";
import FirearmsLicense from "./pages/FirearmsLicense";
import HowToBuy from "./pages/HowToBuy";
import ReloadingGuide from "./pages/ReloadingGuide";
import Contact from "./pages/Contact";
import Contact2 from "./pages/Contact2";
import Contact3 from "./pages/Contact3";
import Contact4 from "./pages/Contact4";
import Contact5 from "./pages/Contact5";
import Contact6 from "./pages/Contact6";
import Contact7 from "./pages/Contact7";
import Contact8 from "./pages/Contact8";
import Contact9 from "./pages/Contact9";
import Contact10 from "./pages/Contact10";
import Contact11 from "./pages/Contact11";
import Reviews1 from "./pages/Reviews1";
import Reviews2 from "./pages/Reviews2";
import Reviews3 from "./pages/Reviews3";
import Reviews4 from "./pages/Reviews4";
import Reviews5 from "./pages/Reviews5";
import Reviews6 from "./pages/Reviews6";
import Reviews7 from "./pages/Reviews7";
import Reviews8 from "./pages/Reviews8";
import Reviews9 from "./pages/Reviews9";
import Reviews10 from "./pages/Reviews10";
import Shop2 from "./pages/Shop2";
import Shop3 from "./pages/Shop3";
import Shop4 from "./pages/Shop4";
import Shop5 from "./pages/Shop5";
import Shop6 from "./pages/Shop6";
import Shop7 from "./pages/Shop7";
import Shop8 from "./pages/Shop8";
import Shop9 from "./pages/Shop9";
import Shop10 from "./pages/Shop10";
import Shop11 from "./pages/Shop11";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReviewProvider>
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
          <Route path="/about2" element={<About2 />} />
          <Route path="/about3" element={<About3 />} />
          <Route path="/about4" element={<About4 />} />
          <Route path="/about5" element={<About5 />} />
          <Route path="/about6" element={<About6 />} />
          <Route path="/about7" element={<About7 />} />
          <Route path="/about8" element={<About8 />} />
          <Route path="/about9" element={<About9 />} />
          <Route path="/about10" element={<About10 />} />
          <Route path="/about11" element={<About11 />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/firearms-license" element={<FirearmsLicense />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/reloading-guide" element={<ReloadingGuide />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact2" element={<Contact2 />} />
          <Route path="/contact3" element={<Contact3 />} />
          <Route path="/contact4" element={<Contact4 />} />
          <Route path="/contact5" element={<Contact5 />} />
          <Route path="/contact6" element={<Contact6 />} />
          <Route path="/contact7" element={<Contact7 />} />
          <Route path="/contact8" element={<Contact8 />} />
          <Route path="/contact9" element={<Contact9 />} />
          <Route path="/contact10" element={<Contact10 />} />
          <Route path="/contact11" element={<Contact11 />} />
          <Route path="/reviews1" element={<Reviews1 />} />
          <Route path="/reviews2" element={<Reviews2 />} />
          <Route path="/reviews3" element={<Reviews3 />} />
          <Route path="/reviews4" element={<Reviews4 />} />
          <Route path="/reviews5" element={<Reviews5 />} />
          <Route path="/reviews6" element={<Reviews6 />} />
          <Route path="/reviews7" element={<Reviews7 />} />
          <Route path="/reviews8" element={<Reviews8 />} />
          <Route path="/reviews9" element={<Reviews9 />} />
          <Route path="/reviews10" element={<Reviews10 />} />
          <Route path="/shop2" element={<Shop2 />} />
          <Route path="/shop3" element={<Shop3 />} />
          <Route path="/shop4" element={<Shop4 />} />
          <Route path="/shop5" element={<Shop5 />} />
          <Route path="/shop6" element={<Shop6 />} />
          <Route path="/shop7" element={<Shop7 />} />
          <Route path="/shop8" element={<Shop8 />} />
          <Route path="/shop9" element={<Shop9 />} />
          <Route path="/shop10" element={<Shop10 />} />
          <Route path="/shop11" element={<Shop11 />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </ReviewProvider>
  </QueryClientProvider>
);

export default App;
