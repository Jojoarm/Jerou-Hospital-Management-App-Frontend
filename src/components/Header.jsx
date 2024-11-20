import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import {
  Contact,
  House,
  Info,
  Menu,
  UsersRound,
  X,
  ArrowDown,
  UserPen,
  Projector,
  LogOut,
  LogIn,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import { AppContext } from '../context/AppContext.jsx';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [menu, setMenu] = useState(false);

  const { user, token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-20 flex justify-between items-center px-6 text-sm bg-white border-b border-gray-400">
      <Logo />
      <div>
        <ul className="hidden md:flex items-start md:gap-1 lg:gap-5 font-medium md:text-base lg:text-xl ">
          <NavLink className="py-1 px-2 hover:text-blue-600 " to="/">
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-blue-600 m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2 hover:text-blue-600 " to="/all-doctors">
            <li className="py-1">Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-blue-600 m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2  hover:text-blue-600 " to="/about">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-blue-600 m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2  hover:text-blue-600 " to="/contact">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-blue-600 m-auto hidden" />
          </NavLink>
        </ul>
      </div>
      <div className="flex">
        {token && user ? (
          <div
            className="hidden md:flex items-center justify-center gap-1 cursor-pointer group relative"
            onMouseEnter={() => setMenu(true)}
            onMouseLeave={() => setMenu(false)}
            onClick={() => setMenu(true)}
          >
            <img
              className="rounded-full w-[25px]"
              src={user.image}
              alt="profile pic"
            />
            <ArrowDown size={16} color="#5f6FFF" />
            {menu && (
              <div className="absolute top-0 right-0 z-20 pt-20">
                <div className="min-w-48 flex flex-col gap-4 p-4 rounded bg-blue-600 font-medium text-base text-white ">
                  <p
                    onClick={() => navigate('/user-profile')}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate('/my-appointments')}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    className="hover:text-black cursor-pointer"
                    onClick={() => logout()}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Login
          </button>
        )}

        {!mobileMenu ? (
          <Menu
            color="#5f6FFF"
            size={40}
            className="md:hidden"
            onClick={() => setMobileMenu(true)}
          />
        ) : (
          <X
            color="#5f6FFF"
            size={40}
            className="md:hidden"
            onClick={() => setMobileMenu(false)}
          />
        )}
      </div>

      {/* Mobile Menu view */}
      {mobileMenu && (
        <motion.div
          initial={{ opacity: 0, x: 2000 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ease: 'linear', duration: 0.2 }}
          className="fixed w-full md:hidden right-0 top-[100px] bottom-0 z-20 px-6 py-2 overflow-hidden bg-slate-700 text-white transition-all opacity-90"
        >
          <div>
            <ul className="flex flex-col items-start md:gap-1 lg:gap-5 font-medium text-xl">
              <NavLink
                className="py-1 px-2 hover:text-blue-600 "
                to="/"
                onClick={() => setMobileMenu(false)}
              >
                <li className="py-1 flex items-start gap-5">
                  <House />
                  Home
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2 hover:text-blue-600 "
                to="/all-doctors"
                onClick={() => setMobileMenu(false)}
              >
                <li className="py-1 flex gap-5">
                  <UsersRound />
                  Doctors
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2  hover:text-blue-600 "
                to="/about"
                onClick={() => setMobileMenu(false)}
              >
                <li className="py-1 flex gap-5">
                  <Info />
                  About
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2  hover:text-blue-600 "
                to="/contact"
                onClick={() => setMobileMenu(false)}
              >
                <li className="py-1 flex gap-5">
                  <Contact />
                  Contact
                </li>
              </NavLink>

              {token && user && (
                <div className="flex flex-col items-start md:gap-1 lg:gap-5 font-medium text-xl">
                  <NavLink
                    className="py-1 px-2 hover:text-blue-600 "
                    to="/user-profile"
                    onClick={() => setMobileMenu(false)}
                  >
                    <li className="py-1 flex items-start gap-5">
                      <UserPen />
                      My Profile
                    </li>
                  </NavLink>
                  <NavLink
                    className="py-1 px-2 hover:text-blue-600 "
                    to="/my-appointments"
                    onClick={() => setMobileMenu(false)}
                  >
                    <li className="py-1 flex items-start gap-5">
                      <Projector />
                      My Appointments
                    </li>
                  </NavLink>
                  <div
                    className="py-1 px-2 hover:text-blue-600 "
                    onClick={() => {
                      logout();
                      navigate('/');
                      setMobileMenu(false);
                    }}
                  >
                    <li className="py-1 flex items-start gap-5">
                      <LogOut />
                      Logout
                    </li>
                  </div>
                </div>
              )}
              {!token && (
                <div
                  className="py-1 px-2 hover:text-blue-600 "
                  onClick={() => {
                    navigate('/login');
                    setMobileMenu(false);
                  }}
                >
                  <li className="py-1 flex items-start gap-5">
                    <LogIn />
                    Login
                  </li>
                </div>
              )}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
