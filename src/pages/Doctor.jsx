import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BadgeCheck, BadgeInfo } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../components/LoadingSpinner';
import RelatedDoctors from '../components/RelatedDoctors';

const Doctor = () => {
  const [docData, setDocData] = useState(false);
  const { backendUrl, isLoading, setIsLoading, token, getDoctors } =
    useContext(AppContext);
  const { docId } = useParams();
  //setting available slots
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(-1);
  const [slotTime, setSlotTime] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [allowBooking, setAllowBooking] = useState(false);
  const navigate = useNavigate();

  const getDoctor = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/doctor-profile/${docId}`
      );
      if (data.success) {
        setIsLoading(false);
        setDocData(data.doctor);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      console.log(error);
    }
  };

  const getAvailableSlots = async () => {
    setAvailableSlots([]);
    let today = new Date();

    //getting the date for 1 week
    for (let i = 0; i < 14; i++) {
      //this will convert date value to a number that can be incremented
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting available time of current day
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      //set time for last appointment
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); //9pm

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + '_' + month + '_' + year;

        //check if the slot is already booked
        const isSlotBooked =
          docData?.slots_booked[slotDate] &&
          docData?.slots_booked[slotDate]?.includes(formattedTime)
            ? true
            : false;

        if (!isSlotBooked) {
          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime,
          });
        }
        //increment start time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setAvailableSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    //check if user is login
    if (!token) {
      toast.warn('Please Login to continue with booking!');
      navigate('/login');
    }
    try {
      const date = availableSlots[slotIndex][0].dateTime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + '_' + month + '_' + year;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctors();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, [docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docData]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-[150px] flex flex-col gap-10 p-5">
      <div className="flex flex-col md:flex-row gap-2 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-72 max-h-64"
        >
          <img
            src={docData.image}
            alt="profile pic"
            className="h-full object-contain border-2 border-slate-300 shadow rounded-xl"
          />
        </motion.div>

        <div className="flex flex-col gap-10 ">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5 }}
            className="flex flex-col gap-3 p-6 border-r-2 border-l-2 shadow border-slate-500 bg-slate-50 rounded-xl h-full"
          >
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <h2 className="font-semibold text-3xl">{docData.name}</h2>
                <BadgeCheck className="size-5 text-blue-600" />
              </div>
              <div className="flex gap-2">
                <p className="text-base">
                  {docData.qualification} -{' '}
                  <span className="font-semibold text-sm">
                    {docData.speciality}
                  </span>
                </p>
                <span className="text-xs border px-5 py-1 rounded-3xl border-slate-300 bg-slate-200">
                  {docData.experience}
                </span>
              </div>
            </div>
            <div>
              <p className="flex gap-2 items-center font-semibold">
                About <BadgeInfo className="size-5 text-slate-500" />
              </p>
              <p className="text-sm md:text-base">{docData.about}</p>
            </div>
            <p className="text-slate-900">
              Appointment Fee:{' '}
              <span className="font-semibold">&#8358; {docData.fee}</span>
            </p>
          </motion.div>
          <div className="flex flex-col items-center justify-self-center gap-5">
            <p className="text-xl font-semibold text-center">
              Available Booking Slots
            </p>
            <div className="flex gap-3 flex-wrap items-center justify-center text-xs md:text-sm mb-3">
              {availableSlots.length &&
                availableSlots.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSlotIndex(index);
                      setShowTime(true);
                    }}
                    className={`text-center py-1 px-2 md:px-5 min-w-16 rounded cursor-pointer ${
                      slotIndex === index
                        ? 'bg-orange-500 text-white'
                        : 'border border-gray-200'
                    }`}
                  >
                    <p>{daysOfWeek[item[0]?.dateTime.getDay()]}</p>
                    <p>{item[0]?.dateTime.getDate()}</p>
                  </div>
                ))}
            </div>
            {showTime && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5 }}
                className="flex gap-3 flex-wrap items-center justify-center md:max-w-[700px] lg:max-w-[1000px] rounded-xl text-xs md:text-sm shadow-sm shadow-orange-300  p-4"
              >
                {availableSlots.length &&
                  availableSlots[slotIndex].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSlotTime(item.time);
                        setAllowBooking(true);
                      }}
                      className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                        item.time === slotTime
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-400 border border-gray-300'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </div>
                  ))}
              </motion.div>
            )}

            <button
              onClick={bookAppointment}
              className="bg-orange-500 disabled:bg-orange-200 disabled:cursor-not-allowed text-white text-sm font-light px-14 py-3 rounded-full my-6"
              disabled={!allowBooking}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-2xl text-center">Related Doctors</h2>
        <RelatedDoctors docId={docId} speciality={docData.speciality} />
      </div>
    </div>
  );
};

export default Doctor;
