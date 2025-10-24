import Loading from "@/components/shared/Loading";
import { IssueCategory } from "@/constants/divisions";
import { useGetAllIssuesQuery } from "@/redux/features/issue/issuApi";
import type { Issue } from "@/types";
import { Link } from "react-router-dom";

const Gas = () => {
  const { data, isLoading, error } = useGetAllIssuesQuery({
    category: IssueCategory.GAS,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center">Error loading road issues.</p>
    );
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Road Issues</h1>

      {data?.issues?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.issues?.map((issue: Issue) => (
            <Link to={`/issues/${issue._id}`} key={issue._id}>
              <div className="bg-white shadow-md rounded-xl border p-4 hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {issue.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {issue.description}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Division:</strong> {issue.division}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Location:</strong> {issue.location}
                </p>
                {issue.images?.[0]?.url ? (
                  <img
                    src={issue.images[0].url}
                    alt={issue.title}
                    className="w-full h-64 object-cover rounded-md mt-3"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 mt-3 rounded-md">
                    No image available
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No issues found.</p>
      )}
    </div>
  );
};

export default Gas;
