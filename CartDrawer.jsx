import { useCart } from "../context/CartContext";

function CartDrawer({ isOpen, onClose, route }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal
  } = useCart();

  const subtotal = getTotal();
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className={`drawer-overlay ${isOpen ? "open" : ""}`}>
      <div className="cart-drawer">

        <h2>Your Cart</h2>

        {/* ✅ SCROLL AREA */}
        <div className="drawer-items-scroll">

          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="drawer-item">

                <h4>{item.name}</h4>
                <p>₹{item.price}</p>

                <div className="drawer-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQty(item.id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

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

                <hr />
              </div>
            ))
          )}

        </div>

        {/* ✅ FIXED FOOTER */}
        <div className="drawer-footer">
          <h4>Subtotal: ₹{subtotal.toFixed(2)}</h4>
          <h4>Tax: ₹{tax.toFixed(2)}</h4>
          <h3>Total: ₹{total.toFixed(2)}</h3>

          <button
            className="primary-btn"
            onClick={() => {
              onClose();
              route("cart");
            }}
          >
            Proceed to Checkout
          </button>

          <button className="secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartDrawer;