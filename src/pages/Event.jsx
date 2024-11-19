import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { BookX, ChevronLeft, CircleCheck } from 'lucide-react';

const Event = () => {
  const { eventId } = useParams();
  const { backendUrl, isLoading, setIsLoading, convertTime } =
    useContext(AppContext);
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  const months = [
    'Janaury',
    'Febraury',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getEvent = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/admin/event/${eventId}`
      );
      if (data.success) {
        setIsLoading(false);
        setEvent(data.event);
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

  useEffect(() => {
    getEvent();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mt-[130px] flex flex-col items-start gap-4 m-auto w-[90%] md:w-[70%] bg-white text-gray-600 shadow-md p-7">
      <div className="flex gap-1 items-center justify-center">
        <ChevronLeft className="size-3" />
        <p
          className="text-gray-600 hover:text-blue-500 hover:underline text-lg cursor-pointer"
          onClick={() => {
            navigate(`/events`);
            scrollTo(0, 0);
          }}
        >
          Events
        </p>
      </div>
      <h2 className="font-semibold text-3xl md:text-4xl">{event.title}</h2>
      {event.registration === 'open' ? (
        <p className="text-green-700 flex gap-2 items-center justify-center font-medium text-base">
          <CircleCheck className="size-4" /> Registration Open
        </p>
      ) : (
        <p className="text-red-700 flex gap-2 items-center justify-center font-medium text-base">
          <BookX className="size-4" /> Registration Closed
        </p>
      )}
      <div className="w-[60%]">
        <img src={event.image} alt="event banner" className="rounded-xl" />
      </div>
      <div>
        <p className="font-semibold text-xl">Description</p>
        <p className="w-[90%] text-xl ">{event.description}</p>
      </div>
      <p className="text-slate-900 text-xl">
        Event Fee: <span className="font-semibold">&#8358; {event.fee}</span>
      </p>
      <div className="text-xl">
        <p className="font-semibold">Time:</p>
        <p>{event.time && convertTime(event?.time)}</p>
      </div>
      <div className="text-md">
        <p className="font-semibold text-lg">Date:</p>
        <p>
          {months[new Date(event.date).getMonth() + 1]}{' '}
          {new Date(event.date).getDate()}, {new Date(event.date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default Event;
