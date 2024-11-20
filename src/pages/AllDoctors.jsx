import { CircleX, Search } from 'lucide-react';
import { specialityData } from '../assets/assets';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllDoctors = () => {
  const { backendUrl } = useContext(AppContext);
  const [doctors, setDoctors] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/get-doctors?q=${searchInput}`
      );
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

  useEffect(() => {
    getDoctors();
  }, [searchInput]);

  return (
    <div className="mt-[130px] flex flex-col md:flex-row gap-3 px-5">
      <div className=" flex flex-col gap-3 px-3 md:min-w-72 ">
        <div className="flex justify-between items-center">
          <p>Filter by speciality</p>
          <p
            className="text-blue-500 underline text-sm cursor-pointer"
            onClick={() => {
              navigate('/all-doctors');
              scrollTo(0, 0);
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
                scrollTo(0, 0);
              }}
            >
              {item.speciality}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-3 items-center">
        <div className="relative w-[85%] lg:w-[70%]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
            <Search className="size-4 md:size-5 text-blue-600" />
          </div>
          <input
            type="text"
            placeholder="Search by speciality or Doctor's name"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-8 md:pl-10 pr-3 py-3 bg-slate-200 rounded-xl border border-blue-600 focus:border-blue-600 focus:ring-2 focus:blue-600 text-black text-xs md:text-sm placeholder-slate-800 transition duration-200"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setSearchInput('')}
          >
            <CircleX className="size-3 md:size-4 text-blue-600 bg-slate-200" />
          </div>
        </div>
        <div className="flex flex-wrap w-full justify-center items-start gap-5">
          {doctors.map((item, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden cursor-pointer shadow-xl hover:scale-105 transition-all duration-500"
              onClick={() => {
                navigate(`/doctor/${item._id}`);
                scrollTo(0, 0);
              }}
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
                <div className="flex items-center gap-2 text-sm text-center">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
