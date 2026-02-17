import { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api/users";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  async function loadUsers() {
    setLoading(true);
    setError(null);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreate(userData) {
    setError(null);
    await createUser(userData);
    await loadUsers();
  }

  async function handleUpdate(userData) {
    setError(null);
    await updateUser(editingUser.id, userData);
    setEditingUser(null);
    await loadUsers();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    setError(null);
    await deleteUser(id);
    if (editingUser?.id === id) setEditingUser(null);
    await loadUsers();
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Supabase Users</h1>
      </header>

      {error && <div className="error-msg">{error}</div>}

      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <UserList users={users} loading={loading} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
