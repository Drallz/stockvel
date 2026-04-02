import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <span>Welcome, {user.email} ({user.role})</span>
          {user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          {user.role === 'treasurer' && <Link to="/treasurer">Treasurer Panel</Link>}
          {(user.role === 'user' || user.role === 'general') && <Link to="/dashboard">My Dashboard</Link>}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;