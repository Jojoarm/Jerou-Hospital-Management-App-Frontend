import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import {
  Calendar1,
  CircleX,
  Loader,
  MapPinHouse,
  Phone,
  Users,
} from 'lucide-react';
import Input from '../components/Input';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserProfile = () => {
  const { user, setUser, isLoading, backendUrl, token, getUser } =
    useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', user.name);
      formData.append('phone', user.phone);
      formData.append('address', JSON.stringify(user.address));
      formData.append('gender', user.gender);
      formData.append('dob', user.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: { token },
        }
      );
      if (data.success) {
        toast.success(data.message);
        await getUser();
        setEditing(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    user && (
      <div className="mt-[150px] flex items-center justify-center relative mx-6">
        {!editing ? (
          <div className=" flex max-w-lg flex-col items-center gap-2 text-sm">
            <div className="flex flex-col items-center">
              <img
                src={user?.image}
                alt="profile pic"
                className="w-36 rounded-full"
              />
              <p className="font-medium text-3xl text-slate-800 mt-4">
                {user.name}
              </p>
            </div>
            <div className="flex flex-col border-b-2 border-t-2 border-[#5f6FFF] p-12 rounded-xl gap-3 shadow-lg">
              <div>
                <p className="text-neutral-500 text-center underline mt-3">
                  CONTACT INFORMATION
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Email id:</p>
                  <p className="text-blue-500">{user?.email}</p>
                </div>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Tel:</p>
                  <p className="text-blue-400">{user?.phone}</p>
                </div>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Address:</p>
                  <p className="text-gray-500">
                    {user?.address?.line1} <br /> {user?.address?.line2}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-neutral-500 text-center underline mt-3">
                  BASIC INFORMATION
                </p>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Gender:</p>
                  <p className="text-blue-500">{user.gender}</p>
                </div>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Date of Birth:</p>
                  <p className="text-blue-400">{user.dob}</p>
                </div>
              </div>
              <button
                className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto flex flex-col items-center justify-center h-full border-b-2 border-t-2  border-[#5f6FFF] rounded-xl gap-3 m-auto min-h-[70vh] max-w-[340px] sm:max-w-md w-full text-sm shadow-lg"
          >
            <div className="p-4">
              <CircleX
                className="absolute right-0 top-0 m-2 cursor-pointer size-4 md:size-5 text-slate-500"
                onClick={() => setEditing(false)}
              />
              <h2 className="text-xl font-semibold mb-6 text-center text-[#5f6FFF] bg-clip-text">
                Update Your Profile
              </h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="image">
                  <div className="inline-block relative cursor-pointer">
                    <img
                      className="w-36 rounded opacity-75"
                      src={image ? URL.createObjectURL(image) : user.image}
                      alt=""
                    />
                    <img
                      className="w-10 absolute bottom-12 right-12"
                      src={image ? '' : assets.upload_icon}
                      alt=""
                    />
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
                <Input
                  icon={Users}
                  type="text"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <Input
                  icon={Users}
                  type="text"
                  placeholder="Email"
                  value={user.email}
                  disabled
                />
                <Input
                  icon={Phone}
                  type="text"
                  placeholder="Tel"
                  value={user.phone}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
                <div>
                  <Input
                    icon={MapPinHouse}
                    type="text"
                    placeholder="Address line1"
                    value={user.address.line1}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <br />
                  <Input
                    icon={MapPinHouse}
                    type="text"
                    placeholder="Address line2"
                    value={user.address.line2}
                    onChange={(e) =>
                      setUser((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Gender:</p>
                  <select
                    className="w-full pr-3 py-2 bg-slate-200 rounded border border-[#5f6FFF] focus:border-[#5f6FFF] focus:ring-2 focus:[#5f6FFF] text-black placeholder-slate-800 transition duration-200"
                    value={user.gender}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="grid grid-cols-[1fr_3fr] gap-4 mt-3 text-neutral-700">
                  <p className="font-medium">Date of Birth:</p>
                  <Input
                    icon={Calendar1}
                    type="date"
                    placeholder="Dob"
                    value={user.dob}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, dob: e.target.value }))
                    }
                  />
                </div>

                <motion.button className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base">
                  {isLoading ? (
                    <Loader className="animate-spin mx-auto" size={24} />
                  ) : (
                    'Update Profile'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    )
  );
};

export default UserProfile;
