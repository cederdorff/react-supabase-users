import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function HomePage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await fetch(URL, { headers });
      const data = await response.json();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    <main className="app">
      <h1 className="page-title">All Users</h1>
      <section className="user-list">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </section>
    </main>
  );
}
