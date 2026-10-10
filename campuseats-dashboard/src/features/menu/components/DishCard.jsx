import { Link } from "react-router-dom";
import { dishImages } from "../data/dishImages";

function DishCard({ dish }) {
  return (
    <article className={`dish-card ${!dish.available ? "dish-card--sold-out" : ""}`}>
      <div className="dish-image">
        <img src={dishImages[dish.id]} alt={dish.name} />
        <span className={`dish-badge ${dish.available ? "is-available" : "is-sold-out"}`}>
          {dish.available ? "Available" : "Sold out"}
        </span>
      </div>

      <div className="dish-content">
        <div>
          <small>{dish.category}</small>
          <h3>{dish.name}</h3>
        </div>
        <p>Rs. {dish.price.toFixed(2)}</p>
        <Link to={`/dish/${dish.id}`} className="dish-link">
          View details
        </Link>
      </div>
    </article>
  );
}

export default DishCard;
