import { useState } from "react";

function FilterSidebar({ filters, toggleFilter, resetFilters }) {
  const [open, setOpen] = useState({
    cuisine: false,
    foodType: false,
    courseType: false,
    beverageType: false,
    alcohol: false,
    allergies: false
  });

  const toggleSection = (key) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderOptions = (title, key, options) => (
    <div className="filter-group">

      <h4 onClick={() => toggleSection(key)} className="filter-title">
        {title} <span>{open[key] ? "▼" : "▶"}</span>
      </h4>

      {open[key] && (
        <div className="filter-options">
          {options.map(opt => (
            <div
              key={opt.label}
              className={`filter-pill ${
                filters[key].includes(opt.value) ? "active" : ""
              }`}
              onClick={() => toggleFilter(key, opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

    </div>
  );

  return (
    <div className="filter-sidebar">

      <h3>Filters</h3>

      {renderOptions("Cuisine", "cuisine", [
        { label: "Italian", value: "italian" },
        { label: "Indian", value: "indian" },
        { label: "Chinese", value: "chinese" },
        { label: "French", value: "french" }
      ])}

      {renderOptions("Food Type", "foodType", [
        { label: "Veg", value: "veg" },
        { label: "Non-Veg", value: "non-veg" }
      ])}

      {renderOptions("Course Type", "courseType", [
        { label: "Starter", value: "starter" },
        { label: "Main", value: "main" },
        { label: "Dessert", value: "dessert" }
      ])}

      {renderOptions("Beverage", "beverageType", [
        { label: "Beverages", value: "yes" },
        { label: "Food", value: "no" }
      ])}

      {renderOptions("Contains Allergens", "allergies", [
        { label: "Dairy", value: "dairy" },
        { label: "Gluten", value: "gluten" },
        { label: "Egg", value: "egg" }
      ])}

      {renderOptions("Alcohol", "alcohol", [
        { label: "Alcoholic", value: "yes" },
        { label: "Non-Alcoholic", value: "no" }
      ])}

      <button className="secondary-btn" onClick={resetFilters}>
        Reset Filters
      </button>

    </div>
  );
}

export default FilterSidebar;