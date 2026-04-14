function EntryPage({ route }) {
  return (
    <div className="entry-page">

      {/* BACKGROUND BUBBLES */}
      <div className="bubbles">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

      {/* CONTENT */}
      <div className="entry-content">
        <h1>Luxury Dining</h1>
        <p>Experience fine dining at your fingertips</p>

        <div className="entry-buttons">
          <button className="primary-btn" onClick={() => route("menu")}>
            Explore Menu
          </button>

          <button className="secondary-btn" onClick={() => route("admin-login")}>
            Admin Login
          </button>
        </div>
      </div>

    </div>
  );
}

export default EntryPage;