import { Link } from "react-router";

export default function UserCard({ user }) {
  return (
    <Link to={`/users/${user.id}`} className="user-card">
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
        {user.mail && <p className="user-mail">{user.mail}</p>}
      </div>
    </Link>
  );
}
