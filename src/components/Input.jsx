const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-blue-600" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-slate-200 rounded border border-blue-600 focus:border-blue-600 focus:ring-2 focus:blue-600 text-black placeholder-slate-800 transition duration-200"
      />
    </div>
  );
};

export default Input;
