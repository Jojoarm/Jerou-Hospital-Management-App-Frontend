import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PaystackPop from '@paystack/inline-js';
import stripe_logo from '../assets/stripe.png';
import paystack_logo from '../assets/paystack-logo.png';
import { motion } from 'framer-motion';
import { Check, CircleX, ThumbsUp, X } from 'lucide-react';

const popup = new PaystackPop();

const MyAppointments = () => {
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const {
    getUserAppointments,
    userAppointments,
    isLoading,
    setIsLoading,
    cancelAppointment,
    deleteAppointment,
    backendUrl,
    token,
    verifyPaystackPayment,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return (
      dateArray[0] + ' ' + months[Number(dateArray[1]) - 1] + ' ' + dateArray[2]
    );
  };

  const makeStripePayment = async (appointmentId) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/stripe-checkout`,
        { appointmentId },
        { headers: { token, 'Content-Type': 'application/json' } }
      );
      if (data.success) {
        setIsLoading(false);
        window.location.href = data?.url;
        // getUserAppointments();
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const makePaystackPayment = async (appointmentId) => {
    try {
      // setIsLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/paystack-checkout`,
        { appointmentId },
        { headers: { token, 'Content-Type': 'application/json' } }
      );
      // console.log('data', data?.data.authorization_url);
      if (data.status) {
        setIsLoading(false);
        popup.resumeTransaction(data?.data.access_code);
        window.location.href = data?.data.authorization_url;

        getUserAppointments();
        verifyPaystackPayment(data?.data.reference);
      } else {
        setIsLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    await cancelAppointment(appointmentId);
    getUserAppointments();
  };

  const handleDeleteAppointment = async (appointmentId) => {
    await deleteAppointment(appointmentId);
    getUserAppointments();
  };

  useEffect(() => {
    getUserAppointments();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-[110px] px-1 md:px-20 text-zinc-700 ">
      <h2 className="font-semibold text-base sm:text-2xl text-center">
        My Appointments
      </h2>
      {userAppointments.map((item, index) => (
        <div
          className="grid grid-cols-[1fr_2fr] sm:flex items-start gap-4 m-4 border-r border-l border-slate-200 shadow rounded p-2 text-xs md:text-sm"
          key={index}
        >
          <div className="w-32 md:w-56 md:h-48 ">
            <img
              className="w-full h-full object-contain rounded-3xl md:rounded-full"
              src={item.docData.image}
              alt="profile picture"
            />
          </div>
          <div className="w-full flex flex-col gap-4 sm:flex-row justify-start">
            <div className="flex flex-col gap-2 ">
              <div>
                <h2 className="font-semibold text-base">{item.docData.name}</h2>
                <p>{item.docData.speciality}</p>
              </div>
              <div>
                <p className="font-semibold">Address:</p>
                <p>{item.docData.address}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Date & Time:</p>
                <p>
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
            </div>

            {!item.cancelled ? (
              <div className="w-full flex flex-col gap-2 items-end justify-end">
                {!item.paid && !showPaymentMethod && (
                  <button
                    className="bg-white hover:bg-orange-500 hover:text-white border rounded w-full md:w-48 p-2"
                    onClick={() => setShowPaymentMethod(true)}
                  >
                    Pay Online
                  </button>
                )}
                {item.paid && !item.isCompleted && (
                  <div className="flex gap-2 items-center justify-center bg-white text-green-500 w-full md:w-48 p-2">
                    <p>Appointment Booked</p>
                    <ThumbsUp className="size-5" />
                  </div>
                )}
                {item.isCompleted && (
                  <div className="flex gap-2 items-center justify-center bg-white text-green-500 w-full md:w-48 p-2">
                    <p>Completed</p>
                    <Check className="size-5" />
                  </div>
                )}
                {/* selecting payment method */}
                {showPaymentMethod && (
                  <div className="fixed h-full w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                    <motion.div
                      className="relative flex flex-col gap-2 items-center rounded border-r-2 border-l-2 shadow bg-white border-blue-500 w-80 p-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="font-bold text-base">
                        Select Payment Method
                      </h2>
                      <div className=" flex gap-6 justify-between">
                        <CircleX
                          className="size-5 text-red-400 absolute top-0 right-0 m-2 cursor-pointer"
                          onClick={() => setShowPaymentMethod(false)}
                        />
                        <div
                          className="w-24 cursor-pointer p-2 border-2 rounded-xl shadow"
                          onClick={() => {
                            makeStripePayment(item._id);
                            setShowPaymentMethod(false);
                          }}
                        >
                          <img
                            src={stripe_logo}
                            className="rounded object-contain"
                            alt="stripe logo"
                          />
                        </div>
                        <div
                          className="w-24 cursor-pointer p-2 border-2 rounded-xl shadow"
                          onClick={() => {
                            makePaystackPayment(item._id);
                            setShowPaymentMethod(false);
                          }}
                        >
                          <img
                            src={paystack_logo}
                            className="rounded object-contain"
                            alt="paystack logo"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
                <button
                  className="bg-white hover:bg-red-500 hover:text-white border border-red-300 text-red-400 rounded w-full md:w-48 p-2"
                  onClick={() => handleCancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div className="w-full relative flex flex-col gap-2 items-end justify-end">
                <p className="sm:absolute sm:top-0 sm:right-0 text-red-600">
                  Appointment Cancelled!
                </p>
                <button
                  className=" bg-green-500 text-white border rounded w-full md:w-48 p-2"
                  onClick={() => {
                    navigate(`/reschedule-appointment/${item._id}`);
                    scrollTo(0, 0);
                  }}
                >
                  Reschedule
                </button>
                <button
                  className="bg-red-500 text-white border rounded w-full md:w-48 p-2"
                  onClick={() => handleDeleteAppointment(item._id)}
                >
                  Delete Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppointments;
