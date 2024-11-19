import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const { events, convertTime, monthsOfYear } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="mt-[130px] bg-slate-50 flex flex-col gap-6 justify-start p-10">
      <h2 className="text-2xl md:text-3xl text-center font-semibold">
        Upcoming Events
      </h2>
      <div className="grid md:grid-cols-[1fr_1fr] gap-3 justify-start w-full">
        {events.map((event, index) => (
          <div
            className="flex items-center gap-4 cursor-pointer hover:bg-slate-100 p-2 rounded-2xl"
            onClick={() => {
              navigate(`/event/${event._id}`);
              scrollTo(0, 0);
            }}
            key={index}
          >
            <div className="flex flex-col gap-1 items-center justify-center text-white w-[80px] md:w-[100px] bg-blue-900 rounded-full py-3">
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

export default Events;
