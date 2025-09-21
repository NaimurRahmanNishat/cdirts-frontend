const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="
          w-28 h-28 
          border-[16px] border-gray-200 
          border-t-blue-500 border-r-green-500 border-b-red-500 border-l-pink-500 
          rounded-full 
          animate-spin
        "
      ></div>
    </div>
  );
};

export default Loader;
