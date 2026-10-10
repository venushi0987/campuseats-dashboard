import { useState } from "react";
import MenuList from "../components/MenuList";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import { heroImage } from "../data/dishImages";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);

  const {
    data: dishes,
    isLoading,
    error,
  } = useFetch("/menu.json");

  if (isLoading) return <p className="state-message">Loading menu...</p>;
  if (error) return <p className="state-message">Could not load menu: {error}</p>;

  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase())
  );
  const availableCount = (dishes || []).filter((dish) => dish.available).length;

  return (
    <section className="menu-page">
      <div className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Fresh picks near lecture halls</span>
          <h1>Order campus favorites without the lunch-rush chaos.</h1>
          <p>
            Browse warm mains, quick snacks, desserts, and cool drinks from the
            CampusEats menu.
          </p>
        </div>
        <div className="hero-image-wrap">
          <img src={heroImage} alt="A table of freshly plated campus meals" />
        </div>
      </div>

      <div className="menu-toolbar">
        <div>
          <span className="section-label">Today&apos;s menu</span>
          <h2>Available dishes</h2>
        </div>
        <div className="menu-stats" aria-label="Menu summary">
          <span>{dishes?.length || 0} dishes</span>
          <span>{availableCount} available</span>
        </div>
      </div>

      <label className="search-box">
        <span>Search Your favorite Food</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dishes..."
        />
      </label>

      <MenuList dishes={filtered} />
    </section>
  );
}

export default MenuPage;
