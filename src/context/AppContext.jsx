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
  const [doctors, setDoctors] = useState([]);
  const [userAppointments, setUserAppointments] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-doctors`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const getUserAppointments = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-appointments`,
        { headers: { token } }
      );
      if (data.success) {
        setIsLoading(false);
        setUserAppointments(data.appointments);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/delete-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        setIsLoading(false);
        toast.success(data.message);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const verifyPaystackPayment = async (reference) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/user/verify-paystack-payment/${reference}`,
        { headers: { token, 'Content-Type': 'application/json' } }
      );
      if (data.success) {
        setIsLoading(false);
        navigate('/my-appointments');
        toast.success(data.message);
      } else {
        setIsLoading(false);
        toast.error(data.message);
        navigate('/my-appointments');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
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
    doctors,
    setDoctors,
    getDoctors,
    getUserAppointments,
    userAppointments,
    cancelAppointment,
    deleteAppointment,
    verifyPaystackPayment,
  };

  useEffect(() => {
    getDoctors();
  }, []);

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
