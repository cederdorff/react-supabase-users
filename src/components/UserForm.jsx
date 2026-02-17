import { useState, useEffect } from "react";

const emptyForm = { name: "", mail: "", title: "", image: "" };

export default function UserForm({ onSubmit, editingUser, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingUser) {
      setForm({
        name: editingUser.name || "",
        mail: editingUser.mail || "",
        title: editingUser.title || "",
        image: editingUser.image || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingUser]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim() || !form.mail.trim()) return;
    onSubmit(form);
    if (!editingUser) setForm(emptyForm);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label htmlFor="mail">Email *</label>
          <input
            id="mail"
            name="mail"
            type="email"
            placeholder="email@example.com"
            value={form.mail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="Job title" value={form.title} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input id="image" name="image" placeholder="https://..." value={form.image} onChange={handleChange} />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingUser ? "Update" : "Create"}
        </button>
        {editingUser && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
