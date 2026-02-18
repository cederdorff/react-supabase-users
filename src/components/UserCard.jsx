export default function UserCard({ user, onEdit, onDelete }) {
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
        <button className="btn btn-edit" onClick={() => onEdit(user)} aria-label={`Edit ${user.name}`}>
          ✏️
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(user.id)} aria-label={`Delete ${user.name}`}>
          🗑️
        </button>
      </nav>
    </article>
  );
}
