function OrderConfirmed({ route }) {
  return (

    <div className="cart-page" style={{ textAlign: "center", color: "gold" }}>

      {/* ✅ ADDED WRAPPER (does NOT remove anything) */}
      <div className="checkout-container">
        <div className="checkout-card" style={{ textAlign: "center" }}>

          <h2 style={{ color: "gold" }}>✨ Order Confirmed ✨</h2>

          <h3 style={{ marginTop: "10px" }}>
            Order ID: {localStorage.getItem("orderId")}
          </h3>

          <p style={{ marginTop: "15px" }}>
            Your order has been placed successfully.
          </p>

          {/* EXTRA SPACING */}
          <br />

          <button
            className="primary-btn"
            onClick={() => route("menu")}
          >
            Back to Menu
          </button>

          {/* EXTRA SPACING */}
          <br /><br />

        </div>
      </div>

    </div>
  );
}

export default OrderConfirmed;