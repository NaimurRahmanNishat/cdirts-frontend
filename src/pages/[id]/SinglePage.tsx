/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import Loading from "@/components/shared/Loading";
import { useGetIssueByIdQuery } from "@/redux/features/issue/issuApi";
import { motion } from "framer-motion"; // 
import CommentSection from "@/components/review/CommentSection";

const SinglePage = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const { data, isLoading, error } = useGetIssueByIdQuery(issueId!, {
    skip: !issueId,
  });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading issue.</p>;
  if (!data?.issue) return <p className="text-gray-500">Issue not found.</p>;

  const {
    title,
    category,
    description,
    images,
    location,
    division,
    createdAt,
    status,
  } = data.issue;

  return (
    <div className="container mx-auto py-8 max-w-6xl px-4">
      {/* Issue Details */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center flex-wrap justify-between mb-6">
          <div className="flex flex-wrap gap-3 text-gray-600">
            <span className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium capitalize">
              📂 {category}
            </span>
            <span className="px-3 py-1 bg-green-100 rounded-full text-sm font-medium">
              📍 {location}
            </span>
            <span className="px-3 py-1 bg-purple-100 rounded-full text-sm font-medium">
              🗺️ {division}
            </span>
            <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm font-medium">
              📅 {new Date(createdAt!).toLocaleDateString()}
            </span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium mb-4 md:mb-0 ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : status === "resolved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Images */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {images.map((img: any) => (
              <img
                key={img.public_id || img.url}
                src={img.url}
                alt={title}
                className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}

        {/* Description */}
        <div className="bg-white py-6 px-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📝 Description
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </div>
      </motion.div>

      {/* Comments Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8"
      >
        <CommentSection issueId={issueId!} />
      </motion.div>
    </div>
  );
};

export default SinglePage;