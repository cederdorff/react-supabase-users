import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import UserForm from "../components/UserForm";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const response = await fetch(`${URL}?id=eq.${id}`, { headers });
      const data = await response.json();
      setUser(data[0]);
    }
    loadUser();
  }, [id]);

  async function handleSubmit(userData) {
    await fetch(`${URL}?id=eq.${id}`, { method: "PATCH", headers, body: JSON.stringify(userData) });
    navigate("/");
  }

  if (!user) return <p className="status-msg">Loading…</p>;

  return (
    <main className="app">
      <header className="app-header">
        <h1>Update User</h1>
      </header>

      <UserForm onSubmit={handleSubmit} editingUser={user} />
    </main>
  );
}
