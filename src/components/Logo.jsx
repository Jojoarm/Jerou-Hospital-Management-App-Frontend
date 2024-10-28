import { useNavigate } from 'react-router-dom';
import Jerou_logo from '../assets/Jerou_logo.jpg';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center">
      <img
        src={Jerou_logo}
        alt="logo"
        className="w-[100px] h-[100px] cursor-pointer"
        onClick={() => navigate('/')}
      />
      <h2 className="font-bold md:text-base lg:text-xl">
        Jerou <br /> Hospital Limited
      </h2>
    </div>
  );
};

export default Logo;
