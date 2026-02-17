import { useState, useEffect, useCallback } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api/users";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreate = async userData => {
    try {
      setError(null);
      await createUser(userData);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async userData => {
    try {
      setError(null);
      await updateUser(editingUser.id, userData);
      setEditingUser(null);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Delete this user?")) return;
    try {
      setError(null);
      await deleteUser(id);
      if (editingUser?.id === id) setEditingUser(null);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

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
