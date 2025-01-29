import { useState, useEffect } from 'react';
import axios from 'axios';

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    const redirectUrl = encodeURIComponent(window.location.href);
    window.location.href = `http://localhost:4000/auth/twitter?redirectUrl=${redirectUrl}`;
  };

  const logout = () => {
    window.location.href = 'http://localhost:4000/logout';
  };

  const ensureAuthenticated = () => {
    if (!loading && !user) {
      login();
    }
  };

  return { userX: user, loading, error, login, logout, ensureAuthenticated };
};

export default useProvideAuth;
