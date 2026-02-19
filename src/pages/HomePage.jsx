import { useEffect, useState } from "react";
import { Link } from "react-router";
import UserList from "../components/UserList";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function HomePage() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    const response = await fetch(URL, { headers });
    const data = await response.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers(); // ignore this warning
  }, []);

  async function handleDelete(id) {
    // Confirm before deleting user
    const deleteConfirmed = window.confirm("Delete this user?");

    // If confirmed, delete user and refresh list
    if (deleteConfirmed) {
      await fetch(`${URL}?id=eq.${id}`, { method: "DELETE", headers });
      await loadUsers();
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>React Supabase Users</h1>
        <Link to="/create" className="btn btn-primary">
          + New User
        </Link>
      </header>

      <UserList users={users} onDelete={handleDelete} />
    </main>
  );
}
