import { NavLink, useNavigate } from 'react-router-dom';
import Jerou_logo from '../assets/Jerou_logo.jpg';
import { useState } from 'react';
import {
  AlarmClockCheck,
  Contact,
  House,
  Info,
  Menu,
  UsersRound,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="flex justify-between items-center px-6 text-sm border-b border-gray-400">
      <Logo />
      <div>
        <ul className="hidden md:flex items-start md:gap-1 lg:gap-5 font-medium md:text-base lg:text-xl ">
          <NavLink className="py-1 px-2 hover:text-[#5f6FFF] " to="/">
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2 hover:text-[#5f6FFF] " to="/doctors">
            <li className="py-1">Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2  hover:text-[#5f6FFF] " to="/about">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden" />
          </NavLink>
          <NavLink className="py-1 px-2  hover:text-[#5f6FFF] " to="/contact">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden" />
          </NavLink>
          <NavLink
            className="py-1 px-2 hover:text-[#5f6FFF] "
            to="/appointments"
          >
            <li className="py-1">Appointments</li>
            <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden" />
          </NavLink>
        </ul>
      </div>
      <div className="flex-none">
        <button
          onClick={() => navigate('/login')}
          className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block"
        >
          Create Account
        </button>
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
              <NavLink className="py-1 px-2 hover:text-[#5f6FFF] " to="/">
                <li className="py-1 flex items-start gap-5">
                  <House />
                  Home
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2 hover:text-[#5f6FFF] "
                to="/doctors"
              >
                <li className="py-1 flex gap-5">
                  <UsersRound />
                  Doctors
                </li>
              </NavLink>
              <NavLink className="py-1 px-2  hover:text-[#5f6FFF] " to="/about">
                <li className="py-1 flex gap-5">
                  <Info />
                  About
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2  hover:text-[#5f6FFF] "
                to="/contact"
              >
                <li className="py-1 flex gap-5">
                  <Contact />
                  Contact
                </li>
              </NavLink>
              <NavLink
                className="py-1 px-2 hover:text-[#5f6FFF] "
                to="/appointments"
              >
                <li className="py-1 flex gap-5">
                  <AlarmClockCheck />
                  Appointments
                </li>
              </NavLink>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Header;
