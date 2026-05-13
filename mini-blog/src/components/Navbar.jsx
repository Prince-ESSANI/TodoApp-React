import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Mini Blog</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">{user.email}</span>
            <Link to="/my-articles">Mes articles</Link>
            <Link to="/create" className="btn-nav">Nouvel article</Link>
            <button onClick={handleLogout} className="btn-logout">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register" className="btn-nav">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}
