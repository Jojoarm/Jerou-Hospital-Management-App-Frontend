import { motion } from 'framer-motion';
// import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="relative flex flex-col items-center gap-3 my-16 text-gray-900 md:mx-10">
      <h2 className="text-2xl font-bold">Top Doctors</h2>
      <p className="text-sm text-center">
        Explore our extensive list of best doctors
      </p>
      <div className=" flex flex-wrap justify-center items-start gap-5">
        {doctors.slice(0, 5).map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              navigate(`/doctor/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:scale-125 transition-all duration-500"
          >
            <div className="w-64 h-60 bg-slate-200">
              <img
                src={item.image}
                alt="profile image"
                className=" h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-green-500">
                <p
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></p>
                <p
                  className={`${
                    item.available ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/all-doctors');
          scrollTo(0, 0);
        }}
        className="md:absolute top-0 right-10 bg-gray-100 text-blue-800 px-2 md:px-12 py-1 md:py-3 text-sm md:text-base rounded-full hover:bg-blue-600 hover:text-white hover:scale-90 transition-all"
      >
        See more
      </button>
    </div>
  );
};

export default TopDoctors;
