import { Link, useParams } from "react-router-dom";
import { dishImages } from "../data/dishImages";
import { useFetch } from "../hooks/useFetch";

function DishDetailPage() {
  const { id } = useParams();
  const { data: dishes, isLoading, error } = useFetch("/menu.json");

  if (isLoading) return <p className="state-message">Loading dish details...</p>;
  if (error) return <p className="state-message">Could not load dish details: {error}</p>;

  const dish = (dishes || []).find((item) => String(item.id) === id);

  if (!dish) {
    return (
      <section className="detail-page compact-page">
        <p className="state-message">Showing details for dish #{id}</p>
        <Link to="/" className="text-link">
          Back to menu
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <Link to="/" className="text-link">
        Back to menu
      </Link>

      <div className="detail-card">
        <div className="detail-image">
          <img src={dishImages[dish.id]} alt={dish.name} />
        </div>
        <div className="detail-copy">
          <span className="section-label">{dish.category}</span>
          <h1>{dish.name}</h1>
          <p className="detail-price">Rs. {dish.price.toFixed(2)}</p>
          <p>
            A campus-ready pick for quick breaks, group lunches, and study-night
            cravings.
          </p>
          <span className={`dish-badge ${dish.available ? "is-available" : "is-sold-out"}`}>
            {dish.available ? "Available today" : "Sold out today"}
          </span>
          <Link to="/order" className="primary-action">
            Place order
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetailPage;
