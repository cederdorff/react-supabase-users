import { useState, useEffect } from "react";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api/users";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  async function loadUsers() {
    const data = await fetchUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleCreate(userData) {
    await createUser(userData);
    await loadUsers();
  }

  async function handleUpdate(userData) {
    await updateUser(editingUser.id, userData);
    setEditingUser(null);
    await loadUsers();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this user?")) return;
    await deleteUser(id);
    if (editingUser?.id === id) setEditingUser(null);
    await loadUsers();
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Supabase Users</h1>
      </header>

      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
