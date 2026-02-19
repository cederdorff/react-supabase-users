import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json"
};

export default function UserDetailPage() {
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

  async function handleDelete() {
    const confirmed = window.confirm("Delete this user?");
    if (confirmed) {
      await fetch(`${URL}?id=eq.${id}`, { method: "DELETE", headers });
      navigate("/");
    }
  }

  if (!user) return <p className="status-msg">Loading…</p>;

  return (
    <main className="app">
      <h1 className="page-title">User Details</h1>

      <article className="user-detail">
        {user.image ? (
          <img src={user.image} alt={user.name} className="user-detail-avatar" />
        ) : (
          <div className="avatar-placeholder large">{user.name?.charAt(0)?.toUpperCase() || "?"}</div>
        )}
        <div className="user-detail-body">
          <h2 className="user-detail-title">{user.name}</h2>
          {user.title && <p className="user-title">{user.title}</p>}
          {user.mail && (
            <address>
              <a className="user-mail" href={`mailto:${user.mail}`}>
                {user.mail}
              </a>
            </address>
          )}
          <div className="user-detail-actions">
            <Link to={`/users/${id}/update`} className="btn btn-primary">
              ✏️ Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
