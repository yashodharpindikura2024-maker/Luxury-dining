import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const getItems = () =>
    JSON.parse(localStorage.getItem("items")) || [];

  const saveItems = (items) =>
    localStorage.setItem("items", JSON.stringify(items));

  const updateStock = (id, change) => {
    let items = getItems();
    items = items.map(i =>
      i.id === id ? { ...i, stock: i.stock + change } : i
    );
    saveItems(items);
  };

  const addToCart = (item) => {
    let items = getItems();
    const found = items.find(i => i.id === item.id);

    if (!found || found.stock <= 0) return;

    updateStock(item.id, -1);

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);

      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    let items = getItems();
    const found = items.find(i => i.id === id);

    if (!found || found.stock <= 0) return;

    updateStock(id, -1);

    setCart(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (id) => {
    updateStock(id, +1);

    setCart(prev =>
      prev
        .map(i =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    const item = cart.find(i => i.id === id);
    if (item) updateStock(id, item.quantity);

    setCart(prev => prev.filter(i => i.id !== id));
  };

  const getTotal = () =>
    cart.reduce((t, i) => t + i.price * i.quantity, 0);

  const generateOrderId = () => {
    let count = parseInt(localStorage.getItem("orderCount") || "0");
    count++;
    localStorage.setItem("orderCount", count);
    return "ORD" + count;
  };

  // ✅ NEW: SALES TRACKING
  const recordSale = () => {
    let sales = JSON.parse(localStorage.getItem("sales")) || [];
    sales.push({
      id: Date.now(),
      amount: getTotal(),
      time: new Date().toLocaleString()
    });
    localStorage.setItem("sales", JSON.stringify(sales));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        getTotal,
        generateOrderId,
        recordSale // ✅ added
      }}
    >
      {children}
    </CartContext.Provider>
  );
};