import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const {
    getUserAppointments,
    userAppointments,
    isLoading,
    cancelAppointment,
    deleteAppointment,
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
                <button className="bg-white hover:bg-orange-500 hover:text-white border rounded w-full md:w-48 p-2">
                  Pay Online
                </button>
                <button
                  className="bg-white hover:bg-red-500 hover:text-white border rounded w-full md:w-48 p-2"
                  onClick={() => handleCancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2 items-end justify-end">
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
