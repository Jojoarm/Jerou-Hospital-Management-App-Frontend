import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [docData, setDocData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const relatedDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setDocData(relatedDoctors);
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="flex flex-wrap justify-center items-start gap-5">
      {docData.map((item, index) => (
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
              <p className="w-2 h-2 bg-green-500 rounded-full"></p>
              <p>{item.available ? 'Available' : 'Not Available'}</p>
            </div>
            <p className="text-gray-900 text-lg font-medium">{item.name}</p>
            <p className="text-gray-600 text-sm">{item.speciality}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RelatedDoctors;
