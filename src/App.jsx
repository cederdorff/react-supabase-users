import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const USERS_ENDPOINT = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  async function readUsers() {
    const response = await fetch(USERS_ENDPOINT, { headers });
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    async function fetchData() {
      await readUsers();
    }
    fetchData();
  }, []);

  async function handleCreate(userData) {
    await fetch(USERS_ENDPOINT, { method: "POST", headers, body: JSON.stringify(userData) });

    await readUsers();
  }

  async function handleUpdate(userData) {
    await fetch(`${USERS_ENDPOINT}?id=eq.${editingUser.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(userData)
    });
    setEditingUser(null);
    await readUsers();
  }

  async function handleDelete(id) {
    const deleteConfirmed = window.confirm("Delete this user?"); // Simple confirmation dialog

    // If confirmed, proceed with deletion
    if (deleteConfirmed) {
      await fetch(`${USERS_ENDPOINT}?id=eq.${id}`, {
        method: "DELETE",
        headers
      });

      // After deletion, refresh the user list
      await readUsers();
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>React Supabase Users</h1>
      </header>

      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </main>
  );
}

export default App;
