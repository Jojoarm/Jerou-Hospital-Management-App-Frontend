import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';

const App = () => {
  const ProtectedRoutes = ({ children }) => {
    const { token } = useContext(AppContext);
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return children;
  };
  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
