import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const { posts } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="mt-[130px] bg-slate-50 shadow mx-10 rounded-xl flex flex-col gap-6 justify-start p-10">
      <h2 className="text-2xl md:text-3xl text-center font-semibold">
        Latest Health Posts
      </h2>
      <div className="grid md:grid-cols-[1fr_1fr] gap-5  md:gap-10 justify-start w-full">
        {posts.map((post, index) => (
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
            <p className="md:font-medium font-normal text-lg border-b border-dotted">
              {post.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
