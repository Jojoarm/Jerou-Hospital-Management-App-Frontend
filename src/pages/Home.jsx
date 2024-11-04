import { Link, useNavigate } from 'react-router-dom';
import background10 from '../assets/background10.jpg';
import { specialityData } from '../assets/assets';
import TopDoctors from '../components/TopDoctors';
import { UsersRound } from 'lucide-react';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

const Home = () => {
  const navigate = useNavigate();
  //   const { token, getUser } = useAuthStore();

  //   useEffect(() => {
  //     console.log(token);
  //     //   getUser();
  //   }, [token]);

  return (
    <div className="mt-[100px]">
      <div className="bg-[url('https://res.cloudinary.com/jojo-cloud/image/upload/v1730273984/background12_cygtw4.jpg')] md:bg-[url('https://res.cloudinary.com/jojo-cloud/image/upload/v1730221708/background8_oz8dun.jpg')] relative bg-cover bg-no-repeat overflow-hidden w-full h-lvh">
        <div className="absolute bottom-0 left-0 text-white mb-10 md:mb-20 px-6 flex flex-col items-start gap-3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-slate-900 font-manrope font-extrabold">
            Delivering Quality Health Care
          </h1>
          <div className="flex gap-2">
            <Link
              to="/doctors"
              className="bg-black text-white hover:bg-white hover:text-[#5f6fff] px-3 py-2 sm:px-8 sm:py-3 rounded"
            >
              Find a Doctor
            </Link>
            <Link
              to="/appointments"
              className="bg-[#5f6FFF] text-white hover:bg-white hover:text-[#5f6fff] px-3 py-2 sm:px-8 sm:py-3 rounded"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 h-full m-10 justify-center border-b border-gray-400 pb-5">
        <div className="md:w-[30%] flex flex-col gap-3 items-start justify-center">
          <h2 className="text-3xl font-bold">Healing starts here</h2>
          <div>
            <p className="font-bold">The right answers the first time</p>
            <p>
              Effective treatment depends on getting the right diagnosis. Our
              experts diagnose and treat the toughest medical challenges.
            </p>
          </div>
          <div>
            <p className="font-bold">Top-ranked in Delta State</p>
            <p>
              Jerou Hospital Limited is highly ranked in Delta State with state
              of the arts facilities and equipments
            </p>
          </div>
          <Link
            to="/about"
            className="bg-white text-[#5f6fff] text-xl border-[#5f6fff] border-2 hover:bg-[#5f6fff] hover:text-white px-3 py-2 sm:px-8 sm:py-3 rounded"
          >
            Why choose Jerou?
          </Link>
        </div>
        <div className="md:w-[30%]">
          <img
            src={background10}
            alt="profile pic"
            className="w-[320px] h-[480px] md:w-[400px] md:h-[600px] rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 px-10 text-center">
        <h2 className="text-xl font-bold">Find by Speciality</h2>
        <p className="text-sm">
          Browse through our extensive list of seasoned doctors by their
          speciality, schedule your appointment hassle-free
        </p>
        <div className="flex flex-wrap justify-center items-center">
          {specialityData.map((item, index) => (
            <Link
              to={`/doctors/${item.speciality}`}
              key={index}
              className="flex flex-col items-center text-xs cursor-pointer gap-2 p-4"
            >
              <img src={item.image} alt="profile icon" className="w-20" />
              <p>{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>

      <TopDoctors />

      <div className="flex flex-col md:flex-row items-center text-center md:text-start gap-5 bg-indigo-950 text-white p-10 justify-center md:justify-between">
        <UsersRound className="hidden md:block" size={50} />
        <h2 className="text-4xl font-manrope font-bold">
          Reach out to a Doctor today!
        </h2>
        <p className="md:w-1/3 text-xl">
          Their crucial work saves lives every day. Let Jerou Hospital attend to
          your health needs by booking an appointment
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Home;
