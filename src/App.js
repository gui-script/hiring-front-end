import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import ProductsPage from "./components/pages/ProductsPage";
import SidebarCart from "./components/SidebarCart";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSidebarCart, setShowSidebarCart] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCartTotal = (value) => {
    setCartTotal((prevTotal) => Math.max(0, prevTotal + value));
  };

  useEffect(() => {
    fetch('https://62d742f351e6e8f06f1a83da.mockapi.io/api/produtos')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const addProductToCart = (id) => {
    const productToAdd = products.find((product) => product.id === id);
    if (!productToAdd || selectedProducts.includes(productToAdd)) return;
    setSelectedProducts([...selectedProducts, productToAdd]);
    const numericPrice = parseFloat(productToAdd.price.replace(",", "."));
    addToCartTotal(numericPrice);
  };

  const removeProductFromCart = (id) => {
    const productToRemove = selectedProducts.find((product) => product.id === id);
    if (!productToRemove) return;
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.id !== id
    );
    setSelectedProducts(newSelectedProducts);
    const numericPrice = parseFloat(productToRemove.price.replace(",", "."));
    addToCartTotal(-numericPrice);
  };

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Router>
      <div className="App">
        <Navbar
          selectedProducts={selectedProducts}
          setShowSidebarCart={setShowSidebarCart}
          onSearch={handleSearch}
        />
        <SidebarCart
          addToCartTotal={addToCartTotal}
          removeProductFromCart={removeProductFromCart}
          cartTotal={cartTotal}
          selectedProducts={selectedProducts}
          setShowSidebarCart={setShowSidebarCart}
          showSidebarCart={showSidebarCart}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  addToCartTotal={addToCartTotal}
                  removeProductFromCart={removeProductFromCart}
                  selectedProducts={selectedProducts}
                  addProductToCart={addProductToCart}
                  products={filteredProducts}
                  setShowSidebarCart={setShowSidebarCart}
                  showSidebarCart={showSidebarCart}
                  cartTotal={cartTotal}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProductsPage
                  products={filteredProducts}
                  addProductToCart={addProductToCart}
                />
              }
            />
            <Route
              path="/cart/checkout"
              element={<div>Página de Checkout R$ {cartTotal.toFixed(2).replace(".", ",")}</div>}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
