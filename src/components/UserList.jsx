import UserCard from "./UserCard";

export default function UserList({ users, onEdit, onDelete }) {
  if (!users.length) return <p className="status-msg">No users found.</p>;

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
