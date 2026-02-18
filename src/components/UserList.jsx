import UserCard from "./UserCard";

export default function UserList({ users, onDelete }) {
  if (!users.length) return <p className="status-msg">No users found.</p>;

  return (
    <section className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
    </section>
  );
}
