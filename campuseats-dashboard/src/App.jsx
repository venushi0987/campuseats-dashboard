import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div className="app-shell">
      <nav className="top-nav" aria-label="Primary navigation">
        <NavLink className="brand-mark" to="/">
          <span className="brand-icon">CE</span>
          <span>
            <strong>CampusEats</strong>
            <small>Student dining dashboard</small>
          </span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Menu</NavLink>
          <NavLink to="/order">Place Order</NavLink>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<p className="state-message">404 - Page not found</p>} />
        </Routes>
      </main>
    </div>
  );
}
