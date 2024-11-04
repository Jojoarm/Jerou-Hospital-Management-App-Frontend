import { useContext, useState } from 'react';
import Input from '../components/Input';
import { Users, MailMinus, Lock, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userSignup, isLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSignup(name, email, password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-[150px] flex flex-col items-center justify-center h-full border-b-2 border-t-2 text-center border-[#5f6FFF] rounded-xl gap-3 m-auto min-h-[60vh] max-w-md w-full text-sm shadow-lg"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-center text-[#5f6FFF] text-transparent bg-clip-text">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            icon={Users}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={MailMinus}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button className="bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base">
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              'Sign Up'
            )}
          </motion.button>
          <p className="mt-2">
            Already have an account?{' '}
            <span
              className="underline cursor-pointer text-[#5f6FFF]"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </motion.div>
  );
}

export default SignUp;
