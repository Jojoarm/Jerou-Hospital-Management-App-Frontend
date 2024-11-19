import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="mt-[130px] flex flex-col items-center justify-center">
      <div className="text-center text-2xl text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full max-w-[350px] rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
          src={assets.contact_image}
          alt="contact image"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">Our OFFICE</p>
          <p className="text-gray-500">
            Flat 10 Overah Estate <br /> Shell Road, Sapele, Delta State,
            Nigeria
          </p>
          <p className="text-gray-500">
            Tel: +234 703 642-4846 <br /> Email: jerouhospitallimited@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Carrers at JEROU
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
