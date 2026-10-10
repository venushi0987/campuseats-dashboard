import { useState } from "react";
import { heroImage } from "../data/dishImages";

function OrderPage() {
  const [form, setForm] = useState({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) {
      e.email = "Enter a valid email";
    }
    if (Number(v.qty) < 1) e.qty = "Qty must be >= 1";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) setDone(true);
  }

  if (done) {
    return (
      <section className="compact-page success-panel">
        <span className="section-label">Order received</span>
        <h1>Thanks, {form.name}!</h1>
        <p>Your CampusEats order is in the queue.</p>
      </section>
    );
  }

  return (
    <section className="order-page">
      <div className="order-visual">
        <img src={heroImage} alt="Fresh meals ready for campus pickup" />
        <div>
          <span className="eyebrow">Fast pickup</span>
          <h1>Place your campus meal order.</h1>
          <p>Share your details and quantity. We will keep the form simple and quick.</p>
        </div>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          {errors.name && <small className="form-error">{errors.name}</small>}
        </label>

        <label>
          <span>Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <small className="form-error">{errors.email}</small>}
        </label>

        <label>
          <span>Quantity</span>
          <input name="qty" type="number" value={form.qty} onChange={handleChange} />
          {errors.qty && <small className="form-error">{errors.qty}</small>}
        </label>

        <button type="submit">Place order</button>
      </form>
    </section>
  );
}

export default OrderPage;
