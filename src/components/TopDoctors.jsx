import { motion } from 'framer-motion';
import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-3 my-16 text-gray-900 md:mx-10">
      <h2 className="text-2xl font-bold">Top Doctors</h2>
      <p className="text-sm text-center">
        Explore our extensive list of best doctors
      </p>
      <div className="flex flex-wrap justify-center items-start gap-5">
        {doctors.slice(0, 5).map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:scale-125 transition-all duration-500"
          >
            <img
              src={item.image}
              alt="profile image"
              className="bg-slate-50 w-64"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-gray-100 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-gray-400 hover:text-white"
      >
        See more
      </button>
    </div>
  );
};

export default TopDoctors;
