import { FaStar } from "react-icons/fa";
import RatingBar from "./RatingBar";

const Rating = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Heading + Stars */}
      <div className="flex items-center gap-2 text-xl font-semibold">
        <span>User Rating</span>
        <div className="flex text-orange-400 text-2xl">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar className="text-gray-300" />
        </div>
      </div>

      <p className="mt-1 text-gray-600">4.1 average based on 254 reviews.</p>
      <hr className="my-4 border-2 border-gray-200" />

      {/* Rating Bars */}
      <div className="space-y-2">
        <RatingBar stars={5} percent={60} count={150} color="bg-green-500" />
        <RatingBar stars={4} percent={30} count={63} color="bg-blue-500" />
        <RatingBar stars={3} percent={10} count={15} color="bg-cyan-500" />
        <RatingBar stars={2} percent={4} count={6} color="bg-orange-500" />
        <RatingBar stars={1} percent={15} count={20} color="bg-red-500" />
      </div>
    </div>
  );
};

export default Rating;
