import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RoleBasedRoute({ element, requiredRole, fallbackRoute }) {
  const { 
    user,
    userData
  } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userData.rol !== requiredRole) {
    return <Navigate to={fallbackRoute} />;
  }

  return element;
}

export default RoleBasedRoute;
