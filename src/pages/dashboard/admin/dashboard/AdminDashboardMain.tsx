import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import adminMan from "../../../../assets/man-with-laptop.png";
import Chartar from "./Chartar";
import LineChart from "./LineChart";
import Loading from "@/components/shared/Loading";
import {
  useGetAdminStatsQuery,
  type AdminStatsResponse,
} from "@/redux/features/stats/statsApi";

const AdminDashboardMain = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: adminData, isLoading, error } = useGetAdminStatsQuery();

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch data</div>;

  const stats: AdminStatsResponse["data"] = adminData?.data || {
    totalIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    solvedIssues: 0,
    monthlyIssues: [],
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 md:gap-8 pt-2 md:pt-8">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Left */}
        <div className="w-full lg:w-[60%] md:h-[220px] h-fit flex bg-white shadow border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
            <div className="flex flex-col gap-4 pt-6 px-6">
              <h1>
                Congratulations{" "}
                <span className="text-pink-500 font-medium">{user?.name}</span> 🎉
              </h1>
              <p className="text-gray-700 text-sm">
                You have done 72% more sales today. <br />
                Check your new badge in your profile.
              </p>
              <div className="md:pt-6">
                <button className="bg-pink-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600">
                  View profile
                </button>
              </div>
            </div>
            <div className="flex md:items-end items-center justify-center md:justify-end pt-8 md:pt-0">
              <img src={adminMan} alt="" className="w-[260px] h-[180px] pr-12" />
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="w-full lg:w-[40%] h-[120px] grid grid-cols-2 gap-4">
          <div className="w-full bg-white shadow border text-center rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Total Issues</h2>
            <p className="text-2xl font-bold">{stats.totalIssues}</p>
          </div>
          <div className="w-full bg-white shadow border text-center rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Pending Issues</h2>
            <p className="text-2xl font-bold">{stats.pendingIssues}</p>
          </div>
            <div className="w-full bg-white shadow border text-center rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">In Progress</h2>
              <p className="text-2xl font-bold">{stats.inProgressIssues}</p>
            </div>
            <div className="w-full bg-white shadow border text-center rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Solved Issues</h2>
              <p className="text-2xl font-bold">{stats.solvedIssues}</p>
            </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="w-full lg:w-[60%] h-[440px] flex bg-white shadow border rounded-lg">
          <Chartar stats={stats} />
        </div>
        <div className="w-full lg:w-[40%] h-[440px] flex flex-col gap-4">
          <div className="w-full h-[440px] bg-white shadow border rounded-lg">
            <LineChart stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
