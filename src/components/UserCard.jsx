export default function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="user-card">
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
        <p className="user-mail">{user.mail}</p>
      </div>
      <div className="user-actions">
        <button className="btn btn-edit" onClick={() => onEdit(user)} title="Edit">
          ✏️
        </button>
        <button className="btn btn-delete" onClick={() => onDelete(user.id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}
