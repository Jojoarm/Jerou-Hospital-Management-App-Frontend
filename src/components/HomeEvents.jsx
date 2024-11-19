import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CircleChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeEvents = () => {
  const { events, monthsOfYear, convertTime } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 justify-start p-4 md:p-10 rounded-2xl shadow-md max-h-[500px]">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-xl md:text-2xl font-semibold">Events</h2>
        <p
          className="text-red-700 flex items-center gap-1 cursor-pointer hover:bg-red-700 hover:text-white p-2 rounded"
          onClick={() => {
            navigate('/events');
            scrollTo(0, 0);
          }}
        >
          See more <CircleChevronRight className="size-4 font-bold" />
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-start">
        {events.slice(0, 3).map((event, index) => (
          <div
            className="grid grid-cols-[1fr_3fr] items-center gap-4 cursor-pointer hover:bg-slate-100 p-2 rounded-2xl"
            onClick={() => {
              navigate(`/event/${event._id}`);
              scrollTo(0, 0);
            }}
            key={index}
          >
            <div className="flex flex-col gap-1 items-center justify-center text-white bg-blue-900 rounded-full py-3">
              <p className="text-sm capitalize">
                {monthsOfYear[new Date(event.date).getMonth() + 1]}
              </p>
              <p className="text-3xl">{new Date(event.date).getDate()}</p>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <p className="text-blue-900 font-semibold">{event.title}</p>
              <p>
                <span className="font-medium">Time:</span>{' '}
                {convertTime(event.time)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeEvents;
