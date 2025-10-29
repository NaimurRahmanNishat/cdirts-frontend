import IssueCard from "@/components/shared/IssueCard";
import Loading from "@/components/shared/Loading";
import { IssueCategory } from "@/constants/divisions";
import { useGetAllIssuesQuery } from "@/redux/features/issue/issuApi";
import type { Issue } from "@/types";

const Road = () => {
  const { data, isLoading, error } = useGetAllIssuesQuery({
    category: IssueCategory.BROKEN_ROAD,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center">Error loading road issues.</p>
    );
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Road Issues</h1>

      {data?.issues?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data?.issues?.map((issue: Issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No issues found.</p>
      )}
    </div>
  );
};

export default Road;
