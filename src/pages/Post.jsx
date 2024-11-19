import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import { Calendar, ChevronLeft, CircleUserRound, Clock } from 'lucide-react';

const Post = () => {
  const { postId } = useParams();
  const { backendUrl, isLoading, setIsLoading } = useContext(AppContext);
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  const timeDifference = () => {
    const postDate = new Date(post.createdAt);
    const today = new Date();
    const yearDifference = today.getFullYear() - postDate.getFullYear();
    const monthDifference = today.getMonth() - postDate.getMonth();
    const dayDifference = today.getDate() - postDate.getDate();
    const hourDifference = today.getHours() - postDate.getHours();
    if (yearDifference > 1) {
      return `${yearDifference} years ago`;
    } else if (yearDifference === 1) {
      return '1 year ago';
    } else if (yearDifference < 1 && monthDifference > 1) {
      return `${monthDifference} months ago`;
    } else if (monthDifference === 1) {
      return '1 month ago';
    } else if (monthDifference < 1 && dayDifference > 1) {
      return `${dayDifference} days ago`;
    } else if (dayDifference === 1) {
      return '1 day ago';
    } else if (dayDifference < 1 && hourDifference > 1) {
      return `${hourDifference} Hours ago`;
    } else if (hourDifference === 1) {
      return '1 hour ago';
    } else {
      return 'Some minutes ago';
    }
  };

  const getPost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/post/${postId}`
      );
      if (data.success) {
        setIsLoading(false);
        setPost(data.post);
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
    getPost();
  }, []);

  //   console.log(new Date(post.createdAt.getFullYear));

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="mt-[130px] flex flex-col items-start gap-4 m-auto w-[90%] md:w-[70%] bg-white text-slate-700 border rounded-2xl shadow-lg p-7">
      <div className="flex gap-1 items-center justify-center">
        <ChevronLeft className="size-3" />
        <p
          className="text-gray-600 hover:text-blue-500 hover:underline text-lg cursor-pointer"
          onClick={() => {
            navigate(`/posts`);
            scrollTo(0, 0);
          }}
        >
          Posts
        </p>
      </div>
      <img
        src={post.image}
        alt="display picture"
        className="w-full rounded shadow"
      />
      <p className="px-3 py-1 rounded-full bg-blue-300 text-white text-center text-sm">
        Doc Talk
      </p>
      <h2 className="text-black text-2xl md:text-4xl font-medium">
        {post.title}
      </h2>
      <div className="flex flex-wrap gap-3 md:gap-3 items-center justify-start text-sm text-gray-500">
        <div className="flex gap-2 items-center justify-center">
          <CircleUserRound />
          <p className="">{post.author}</p>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Calendar className="size-4" />
          <p className="">{timeDifference()}</p>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <Clock className="size-4" />
          <p className="">{Math.round(post.readTime)} mins read</p>
        </div>
      </div>
      <p className="text-base whitespace-pre-wrap">{post.content}</p>
    </div>
  );
};

export default Post;
