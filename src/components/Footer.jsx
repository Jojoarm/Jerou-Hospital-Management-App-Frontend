import Logo from './Logo';

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm px-5">
        <div>
          <Logo />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We treat, God heals! There is no one who loves pain itself, who
            seeks after it and wants to have it, simply because it is pain...
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+2347036424846</li>
            <li>jerouhospitallimited@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Jerou Hospital Limited - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
