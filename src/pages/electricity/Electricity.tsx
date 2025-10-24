/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/shared/Loading";
import { IssueCategory } from "@/constants/divisions";
import { useGetAllIssuesQuery } from "@/redux/features/issue/issuApi";
import { Link } from "react-router-dom";

const ElectricityPage = () => {
  const { data, isLoading, error } = useGetAllIssuesQuery({
    category: IssueCategory.ELECTRICITY,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading/>;
  if (error) return <p>Failed to load issues.</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Electricity Issues</h1>

      {data?.issues?.length ? (
        <Link to={`/${data.issues[0]._id}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.issues.map((issue: any) => (
            <div
              key={issue._id}
              className="bg-white shadow-md rounded-xl border p-4 hover:shadow-lg transition"
            >
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
            </div>
          ))}
        </Link>
      ) : (
        <p className="text-gray-500">No issues found.</p>
      )}
    </div>
  );
};

export default ElectricityPage;
