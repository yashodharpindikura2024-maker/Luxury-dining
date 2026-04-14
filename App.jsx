import { useState, useEffect } from "react";
import EntryPage from "./components/EntryPage";
import MenuPage from "./components/MenuPage";
import Cart from "./components/Cart";
import OrderConfirmed from "./components/OrderConfirmed";
import CartDrawer from "./components/CartDrawer";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [page, setPage] = useState("entry");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const route = (p) => {
    if (p === "drawer") {
      setDrawerOpen(true);
    } else {
      setPage(p);
    }
  };

  useEffect(() => {
    document.body.classList.add("dark-mode");
  }, []);

  return (
    <>
      {page === "entry" && <EntryPage route={route} />}
      {page === "menu" && <MenuPage route={route} />}
      {page === "cart" && <Cart route={route} />}
      {page === "order" && <OrderConfirmed route={route} />}
      {page === "admin-login" && <AdminLogin route={route} />}
      {page === "admin-panel" && <AdminPanel route={route} />}

      <CartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        route={route}
      />
    </>
  );
}

export default App;