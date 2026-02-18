import { useNavigate } from "react-router";
import UserForm from "../components/UserForm";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function CreatePage() {
  const navigate = useNavigate();

  async function handleSubmit(userData) {
    await fetch(URL, { method: "POST", headers, body: JSON.stringify(userData) });
    navigate("/");
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Create User</h1>
      </header>

      <UserForm onSubmit={handleSubmit} />
    </main>
  );
}
