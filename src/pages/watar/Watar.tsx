import Loading from "@/components/shared/Loading";
import { IssueCategory } from "../../constants/divisions";
import { useGetAllIssuesQuery } from "@/redux/features/issue/issuApi";


const Watar = () => {
  const { data, isLoading, error } = useGetAllIssuesQuery({
    category: IssueCategory.WATAR,
    page: 1,
    limit: 10,
  });

  if (isLoading) return <Loading/>;
  if (error) return <p>Error loading water issues.</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Water Issues</h1>
      {data?.issues?.length ? (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.issues.map((issue) => (
            <li key={issue._id} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-semibold">{issue.title}</h2>
              <p className="text-sm text-gray-500">{issue.description}</p>
              <img src={issue.images[0].url} alt="" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No watar issues found.</p>
      )}
    </div>
  );
};

export default Watar;
