import { useState } from "react";

export default function UserForm({ onSubmit, editingUser, onCancel }) {
  const [name, setName] = useState(editingUser?.name || "");
  const [mail, setMail] = useState(editingUser?.mail || "");
  const [title, setTitle] = useState(editingUser?.title || "");
  const [image, setImage] = useState(editingUser?.image || "");

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit({ name, mail, title, image });
    if (!editingUser) {
      setName("");
      setMail("");
      setTitle("");
      setImage("");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="mail">Email *</label>
          <input
            id="mail"
            name="mail"
            type="email"
            placeholder="email@example.com"
            value={mail}
            onChange={e => setMail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Job title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            name="image"
            placeholder="https://..."
            value={image}
            onChange={e => setImage(e.target.value)}
          />
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
