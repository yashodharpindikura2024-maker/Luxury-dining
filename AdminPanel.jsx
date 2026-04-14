import { useEffect, useState } from "react";

function AdminPanel({ route }) {

  const [items, setItems] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [section, setSection] = useState("manage");
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "", // ✅ ADDED
    cuisine: [],
    foodType: [],
    courseType: [],
    beverageType: [],
    alcohol: [],
    allergies: []
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items")) || [];
    setItems(data);

    const salesData = JSON.parse(localStorage.getItem("sales")) || [];
    setSales(salesData);

    const orderData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(orderData);

  }, []);

  const saveItems = (updated) => {
    setItems(updated);
    localStorage.setItem("items", JSON.stringify(updated));
  };

  const toggleArray = (field, value) => {
    setForm(prev => {
      const arr = prev[field];
      return arr.includes(value)
        ? { ...prev, [field]: arr.filter(v => v !== value) }
        : { ...prev, [field]: [...arr, value] };
    });
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;

    const newItem = {
      id: Date.now(),
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image , // ✅ ADDED
      stock: 10,
      sales: 0,
      lastEdited: new Date().toLocaleString(),
      ...form,
      hidden: false
    };

    saveItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    const updated = items.filter(i => i.id !== id);
    saveItems(updated);
  };

  const toggleHide = (id) => {
    const updated = items.map(i =>
      i.id === id ? { ...i, hidden: !i.hidden } : i
    );
    saveItems(updated);
  };

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <h2>Admin Dashboard</h2>

        <p onClick={() => setSection("overview")}>Overview</p>
        <p onClick={() => setSection("orders")}>Orders</p>
        <p onClick={() => setSection("reports")}>Reports</p>
        <p onClick={() => setSection("manage")}>Manage Items</p>
      </div>

      {/* MAIN */}
      <div className="admin-main">

        {/* TOP BAR */}
        <div className="admin-topbar">
          <h1>Admin Dashboard</h1>

          <button
            className="secondary-btn"
            style={{ marginLeft: "auto" }}
            onClick={() => route("entry")}
          >
            Logout
          </button>
        </div>

        {/* OVERVIEW */}
        {section === "overview" && (
          <div>
            <h2>Overview</h2>
            <p>Total Orders: {orders.length}</p>
            <p>Total Revenue: ₹{sales.reduce((t, s) => t + s.amount, 0)}</p>
            <p>Active Items: {items.filter(i => !i.hidden).length}</p>
          </div>
        )}

        {/* ORDERS */}
        {section === "orders" && (
          <div>
            <h2>Orders</h2>

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map(o => (
                <div className="admin-card-item" key={o.id}>
                  <p><strong>{o.id}</strong></p>
                  <p>Total: ₹{o.total.toFixed(2)}</p>
                  <p>{o.time}</p>

                  {o.items.map(i => (
                    <p key={i.id}>
                      {i.name} x {i.quantity}
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {/* REPORTS */}
        {section === "reports" && (
          <div>
            <h2>Reports</h2>

            <p>Total Revenue: ₹{sales.reduce((t, s) => t + s.amount, 0)}</p>
            <p>Total Orders: {orders.length}</p>

            <h3>Top Selling Items</h3>

            {items.map(item => (
              <p key={item.id}>
                {item.name} — {item.sales || 0} sold
              </p>
            ))}
          </div>
        )}

        {/* MANAGE ITEMS */}
        {section === "manage" && (
          <div>

            <h2>Manage Items</h2>

            <input
              placeholder="Search item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="primary-btn"
              onClick={() => {
                document.getElementById("add-item-form").scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              Add New Item
            </button>

            <hr />

            {filtered.map(item => (
              <div className="admin-card-item" key={item.id}>

               <div className="admin-image">
  <img src={item.image} alt={item.name} />
</div>

                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
                <p>Stock: {item.stock}</p>
                <p>Sales: {item.sales || 0}</p>
                <p>Last Edited: {item.lastEdited || "-"}</p>

                <div>

                  <button
                    onClick={() => {
                      const newStock = prompt("Enter new stock:", item.stock);
                      if (newStock !== null) {
                        const updated = items.map(i =>
                          i.id === item.id
                            ? { ...i, stock: Number(newStock) }
                            : i
                        );
                        saveItems(updated);
                      }
                    }}
                  >
                    Edit Stock
                  </button>

                  <button onClick={() => toggleHide(item.id)}>
                    {item.hidden ? "Activate" : "Deactivate"}
                  </button>

                  <button onClick={() => deleteItem(item.id)}>
                    Delete Permanently
                  </button>

                </div>

              </div>
            ))}

            <hr />

            {/* ADD FORM */}
            <h2 id="add-item-form">Add New Item</h2>

            <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
            <textarea placeholder="Description" onChange={(e)=>setForm({...form,description:e.target.value})}/>
            <input placeholder="Price" type="number" onChange={(e)=>setForm({...form,price:e.target.value})}/>

            {/* ✅ ADDED IMAGE INPUT */}
            <input placeholder="Image URL" onChange={(e)=>setForm({...form,image:e.target.value})}/>

            <h4>Cuisine</h4>
            {["Indian","Chinese","Italian","Continental","Mexican"].map(c => (
              <label key={c}>
                <input type="checkbox" onChange={()=>toggleArray("cuisine",c)}/> {c}
              </label>
            ))}

            <h4>Food Type</h4>
            {["Veg","Non-Veg","Seafood"].map(f => (
              <label key={f}>
                <input type="checkbox" onChange={()=>toggleArray("foodType",f)}/> {f}
              </label>
            ))}

            <h4>Course Type</h4>
            {["Soup","Starter","Main","Dessert"].map(c => (
              <label key={c}>
                <input type="checkbox" onChange={()=>toggleArray("courseType",c)}/> {c}
              </label>
            ))}

            <h4>Beverage Type</h4>
            {["Alcoholic","Non-Alcoholic","Mocktail","Cocktail","Soft Drink"].map(b => (
              <label key={b}>
                <input type="checkbox" onChange={()=>toggleArray("beverageType",b)}/> {b}
              </label>
            ))}

            <h4>Allergens</h4>
            {["Dairy","Gluten","Nuts","Shellfish"].map(a => (
              <label key={a}>
                <input type="checkbox" onChange={()=>toggleArray("allergies",a)}/> {a}
              </label>
            ))}

            <br /><br />

            <button className="primary-btn" onClick={handleAdd}>
              Add Item
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPanel;