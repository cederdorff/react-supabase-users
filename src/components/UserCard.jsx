import { Link } from "react-router";

export default function UserCard({ user, onDelete }) {
  return (
    <article className="user-card">
      <div className="user-avatar">
        {user.image ? (
          <img src={user.image} alt={user.name} />
        ) : (
          <div className="avatar-placeholder">{user.name?.charAt(0)?.toUpperCase() || "?"}</div>
        )}
      </div>
      <div className="user-info">
        <h3>{user.name}</h3>
        {user.title && <p className="user-title">{user.title}</p>}
        <address>
          <a className="user-mail" href={`mailto:${user.mail}`}>
            {user.mail}
          </a>
        </address>
      </div>
      <nav className="user-actions" aria-label="User actions">
        <Link to={`/update/${user.id}`} className="btn btn-edit" aria-label={`Edit ${user.name}`}>
          ✏️
        </Link>
        <button className="btn btn-delete" onClick={() => onDelete(user.id)} aria-label={`Delete ${user.name}`}>
          🗑️
        </button>
      </nav>
    </article>
  );
}
