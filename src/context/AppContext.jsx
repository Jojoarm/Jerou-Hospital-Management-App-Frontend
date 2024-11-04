import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // const backendUrl = 'http://localhost:5000';

  const navigate = useNavigate();

  const userSignup = async (name, email, password) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/signup`, {
        name,
        email,
        password,
      });

      if (data.success) {
        setIsLoading(false);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const userLogin = async (email, password) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        setIsLoading(false);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { token },
      });
      if (data.success) {
        setUser(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    getUser,
    userLogin,
    backendUrl,
    isLoading,
    setIsLoading,
    userSignup,
  };

  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setUser(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
