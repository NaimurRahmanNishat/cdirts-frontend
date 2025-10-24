import { useParams } from "react-router-dom";
import Loading from "@/components/shared/Loading";
import { useGetIssueByIdQuery } from "@/redux/features/issue/issuApi";

const SinglePage = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const { data, isLoading, error } = useGetIssueByIdQuery(issueId!, { skip: !issueId });

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading issue.</p>;
  if (!data?.issue) return <p className="text-gray-500">Issue not found.</p>;

  const { title, category, description, images, location, division, createdAt } = data.issue;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">{title}</h1>
      <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
        <span className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium capitalize">
          Category: {category}
        </span>
        <span className="px-3 py-1 bg-green-100 rounded-full text-sm font-medium">
          Location: {location}
        </span>
        <span className="px-3 py-1 bg-purple-100 rounded-full text-sm font-medium">
          Division: {division}
        </span>
        <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm font-medium">
          Date: {new Date(createdAt!).toLocaleDateString()}
        </span>
      </div>

      {images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {images.map((img) => (
            <img
              key={img.public_id}
              src={img.url}
              alt={title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SinglePage;
