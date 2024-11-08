import { specialityData } from '../assets/assets';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const FilteredDoctors = () => {
  const { backendUrl } = useContext(AppContext);
  const [filter, setFilter] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  const { speciality } = useParams();

  const filterDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-doctors/${speciality}`
      );
      if (data.success) {
        setFilteredDoctors(data.filteredDocs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    filterDoctors();
  }, [filter]);

  return (
    <div className="mt-[130px] flex flex-col md:flex-row gap-3 px-5">
      <div className=" flex flex-col gap-3 px-3 md:min-w-72 ">
        <div className="flex justify-between items-center">
          <p>Filter by speciality</p>
          <p
            className="text-blue-500 underline text-sm cursor-pointer"
            onClick={() => {
              navigate('/all-doctors');
            }}
          >
            Reset Filters
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {specialityData.map((item, index) => (
            <div
              key={index}
              className="w-full px-3 py-2 border rounded-full text-sm text-slate-700 cursor-pointer hover:bg-slate-800 hover:text-white"
              onClick={() => {
                navigate(`/all-doctors/${item.speciality}`);
                setFilter(item.speciality);
              }}
            >
              {item.speciality}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 items-center">
        <h2 className="px-4 py-2 font-semibold text-2xl text-slate-600 border-r-2 border-l-2 rounded shadow">
          Our {speciality}s
        </h2>
        <div className="flex flex-wrap w-full justify-center items-start gap-5">
          {filteredDoctors.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer hover:scale-125 transition-all duration-500"
              onClick={() => navigate(`/doctor/${item._id}`)}
            >
              <div className="h-full w-full bg-slate-200">
                <img
                  src={item.image}
                  alt="profile image"
                  className="w-64 h-60  object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.available}
                    //   onChange={() => changeAvailability(item._id)}
                  />
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredDoctors;
