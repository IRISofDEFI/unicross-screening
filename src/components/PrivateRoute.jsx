import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('staff_token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
