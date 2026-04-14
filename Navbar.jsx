import { useState } from "react";
import { useCart } from "../context/CartContext";

function Navbar({ route, search, setSearch, sort, setSort }) {
  const { cart } = useCart();
  const [dark, setDark] = useState(true);

  const count = cart.reduce((t, i) => t + i.quantity, 0);

  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    setDark(!dark);
  }

  return (
    <div className="navbar">

      <h2>Luxury Dining</h2>

      <input
        className="search-bar"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="sort-dropdown"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="default">Sort: Default</option>
        <option value="low">Price: Low → High</option>
        <option value="high">Price: High → Low</option>
      </select>

      <div className="nav-actions">
        <button onClick={() => route("drawer")} className="cart-btn">
          🛒 {count}
        </button>

        <button onClick={toggleTheme} className="toggle-btn">
          {dark ? "🌙" : "☀️"}
        </button>

        <button onClick={() => route("entry")} className="logout-btn">
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;