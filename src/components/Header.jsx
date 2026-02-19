import { Link } from "react-router";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          Users
        </Link>
        <Link to="/create" className="btn btn-primary">
          + New User
        </Link>
      </div>
    </header>
  );
}
