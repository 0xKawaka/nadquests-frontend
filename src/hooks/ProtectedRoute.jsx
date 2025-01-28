import React from 'react';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading, login } = useAuth();

  React.useEffect(() => {
    if (!loading && !user) {
      login();
    }
  }, [loading, user, login]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : null;
};

export default ProtectedRoute;
