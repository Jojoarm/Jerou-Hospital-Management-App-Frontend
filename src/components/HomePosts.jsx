import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CircleChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePosts = () => {
  const { posts } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 justify-start p-4 md:p-10 rounded-2xl shadow-md">
      <div className="flex justify-between gap-1 items-center w-full">
        <h2 className="text-xl md:text-2xl font-semibold">Health Blog</h2>
        <p
          className="text-red-700 flex items-center gap-1  cursor-pointer hover:bg-red-700 hover:text-white p-2 rounded"
          onClick={() => {
            navigate('/posts');
            scrollTo(0, 0);
          }}
        >
          More stories <CircleChevronRight className="size-4 font-bold" />
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-start">
        {posts.slice(0, 3).map((post, index) => (
          <div
            className="grid grid-cols-[1.5fr_3fr] items-center gap-4 cursor-pointer bg-slate-50 hover:bg-slate-100 p-2 rounded-2xl shadow"
            onClick={() => {
              navigate(`/post/${post._id}`);
              scrollTo(0, 0);
            }}
            key={index}
          >
            <img
              src={post.image}
              alt="display picture"
              className="w-full rounded shadow-2xl"
            />
            <p className="md:font-medium font-normal text-blue-900 text-lg border-b border-dotted">
              {post.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePosts;
