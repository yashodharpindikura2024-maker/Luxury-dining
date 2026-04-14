import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterSidebar from "./FilterSidebar";
import { getInitialItems } from "../data/items";
import { useCart } from "../context/CartContext";

function MenuPage({ route }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  const [filters, setFilters] = useState({
    cuisine: [],
    foodType: [],
    courseType: [],
    beverageType: [],
    alcohol: [],
    allergies: []
  });

  const [floatMap, setFloatMap] = useState({});

  function triggerFloat(id, type) {
    setFloatMap(prev => ({ ...prev, [id]: type }));

    setTimeout(() => {
      setFloatMap(prev => ({ ...prev, [id]: null }));
    }, 600);
  }

  useEffect(() => {
    localStorage.removeItem("items");
    const data = getInitialItems();
    localStorage.setItem("items", JSON.stringify(data));
    setItems(data);
  }, []);

  function toggleFilter(category, value) {
    setFilters(prev => {
      const curr = prev[category];
      return curr.includes(value)
        ? { ...prev, [category]: curr.filter(v => v !== value) }
        : { ...prev, [category]: [...curr, value] };
    });
  }

  function resetFilters() {
    setFilters({
      cuisine: [],
      foodType: [],
      courseType: [],
      beverageType: [],
      alcohol: [],
      allergies: []
    });
  }

  function applyAllFilters() {

    const toArray = (val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    };

    let result = items.filter(item => {

      if (item.hidden) return false;

      if (search && !item.name.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (
        filters.cuisine.length &&
        !filters.cuisine.some(f =>
          toArray(item.cuisine).map(v => v.toLowerCase()).includes(f)
        )
      ) return false;

      if (
        filters.foodType.length &&
        !filters.foodType.some(f =>
          toArray(item.type).map(v => v.toLowerCase()).includes(f)
        )
      ) return false;

      if (
        filters.courseType.length &&
        !filters.courseType.some(f =>
          toArray(item.course).map(v => v.toLowerCase()).includes(f)
        )
      ) return false;

      if (filters.beverageType.length) {
        const val = item.beverage ? "yes" : "no";
        if (!filters.beverageType.includes(val)) return false;
      }

      if (
        filters.alcohol.length &&
        !filters.alcohol.some(f =>
          toArray(item.alcohol).map(v => v.toLowerCase()).includes(f)
        )
      ) return false;

      if (
        filters.allergies.length &&
        !filters.allergies.some(f =>
          toArray(item.allergies).map(v => v.toLowerCase()).includes(f)
        )
      ) return false;

      return true;
    });

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }

  return (
    <div>

      <Navbar
        route={route}
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      <div className="layout">

        <FilterSidebar
          filters={filters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />

        <div className="menu-container">
          {applyAllFilters().map(item => {
            const cartItem = cart.find(i => i.id === item.id);

            return (
              <div className="menu-card" key={item.id}>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>₹{item.price}</p>

                  {item.stock <= 3 && item.stock > 0 && (
                    <p style={{ color: "orange" }}>
                      Low Stock ({item.stock} left)
                    </p>
                  )}

                  {!cartItem ? (
                    <button className="primary-btn" onClick={() => addToCart(item)}>
                      Add to Cart
                    </button>
                  ) : (
                    <div className="qty-controls">

                      <button
                        className="qty-btn"
                        onClick={() => {
                          decreaseQty(item.id);
                          triggerFloat(item.id, "minus");
                        }}
                      >
                        −
                      </button>

                      <span className="qty-number">{cartItem.quantity}</span>

                      <button
                        className="qty-btn"
                        onClick={() => {
                          increaseQty(item.id);
                          triggerFloat(item.id, "plus");
                        }}
                      >
                        +
                      </button>

                      {floatMap[item.id] === "plus" && (
                        <span className="float-text plus">+1</span>
                      )}

                      {floatMap[item.id] === "minus" && (
                        <span className="float-text minus">-1</span>
                      )}

                    </div>
                  )}
                </div>

                <div className="menu-image">
                  <img
                    src={item.image || "https://source.unsplash.com/400x300/?food"}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default MenuPage;