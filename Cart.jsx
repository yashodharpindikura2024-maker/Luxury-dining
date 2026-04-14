import { useState } from "react";
import { useCart } from "../context/CartContext";

function Cart({ route }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal,
    generateOrderId,
    recordSale
  } = useCart();

  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");

  const subtotal = getTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleOrder = () => {
    if (!payment) {
      setError("Please select a payment method before confirming your order.");
      return;
    }

    const orderId = generateOrderId();
    localStorage.setItem("orderId", orderId);

    recordSale();

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
      id: orderId,
      items: cart,
      total: total,
      time: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    route("order");
  };

  return (
    <div className="cart-page" style={{ textAlign: "center", color: "gold" }}>

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() => decreaseQty(item.id)}
              >
                −
              </button>

              <span className="qty-number">
                {item.quantity}
              </span>

              <button
                className="qty-btn"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>
            </div>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>

          </div>
        ))
      )}

      <hr />

      <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
      <h3>Tax (18%): ₹{tax.toFixed(2)}</h3>
      <h2>Total: ₹{total.toFixed(2)}</h2>

      <div className="payment-section">
        <h3>Select Payment Method</h3>

        <label>
          <input type="radio" name="p" onChange={() => setPayment("card")} />
          Credit / Debit Card
        </label>

        <label>
          <input type="radio" name="p" onChange={() => setPayment("upi")} />
          UPI
        </label>

        <label>
          <input type="radio" name="p" onChange={() => setPayment("cash")} />
          Cash
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="primary-btn" onClick={handleOrder}>
          Confirm Order
        </button>
      </div>

      <button
        className="secondary-btn"
        style={{ marginTop: "30px" }}
        onClick={() => route("menu")}
      >
        ← Back to Menu
      </button>

    </div>
  );
}

export default Cart;