/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAllIssuesQuery } from "@/redux/features/issue/issuApi";
import Loading from "@/components/shared/Loading";
import type { Issue } from "@/types";

interface IAuthor {
  _id: string;
  name: string;
  email: string;
}

interface TableUser {
  id: string | number;
  name: string;
  email: string;
  title: string;
  division: string;
  category: string;
  status: string;
}

const UserManagement = () => {
  const [category, setCategory] = useState<string>("");
  const [division, setDivision] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { data, isLoading: issuesLoading } = useGetAllIssuesQuery();
  const issues: Issue[] = data?.issues ?? [];

  const issueBasedUsers = useMemo((): TableUser[] => {
    return issues.map((issue: Issue, index: number) => {
      const author: IAuthor | null =
        issue.author && typeof issue.author === "object"
          ? (issue.author as IAuthor)
          : null;

      return {
        id: issue._id || `issue-${index + 1}`,
        name: author?.name || "Unknown User",
        email: author?.email || "Unknown Email",
        title: issue.title || "N/A",
        division: issue.division || "N/A",
        category: issue.category || "N/A",
        status: issue.status || "pending",
      };
    });
  }, [issues]);

  const finalUsers: TableUser[] = [...issueBasedUsers];

  const filteredUsers = useMemo((): TableUser[] => {
    let users = [...finalUsers];

    if (division) {
      users = users.filter(
        (u) => u.division?.toLowerCase() === division.toLowerCase()
      );
    }

    if (category) {
      users = users.filter(
        (u) =>
          u.category?.toLowerCase().replace(/\s+/g, "-") ===
          category.toLowerCase()
      );
    }

    if (status) {
      users = users.filter(
        (u) =>
          u.status?.toLowerCase().replace(/\s+/g, " ") ===
          status.toLowerCase()
      );
    }

    return users;
  }, [category, division, status, finalUsers]);

  if (issuesLoading) {
    return <Loading />;
  }

  return (
    <div className="py-6 space-y-6">
      {/* ---------- FILTER BAR ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-md">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="water">Water</SelectItem>
              <SelectItem value="electricity">Electricity</SelectItem>
              <SelectItem value="gas">Gas</SelectItem>
              <SelectItem value="broken-road">Broken Road</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Division Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 font-medium mb-2">
            Division
          </label>
          <Select value={division} onValueChange={setDivision}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dhaka">Dhaka</SelectItem>
              <SelectItem value="chattogram">Chattogram</SelectItem>
              <SelectItem value="rajshahi">Rajshahi</SelectItem>
              <SelectItem value="khulna">Khulna</SelectItem>
              <SelectItem value="barishal">Barishal</SelectItem>
              <SelectItem value="sylhet">Sylhet</SelectItem>
              <SelectItem value="rangpur">Rangpur</SelectItem>
              <SelectItem value="mymensingh">Mymensingh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-gray-700 font-medium mb-2">
            Status
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="solved">Solved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ---------- USER TABLE ---------- */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 border-b">#</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Title</th>
              <th className="py-3 px-4 border-b">Division</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    user.division === division ? "bg-blue-50 font-semibold" : ""
                  }`}
                >
                  <td className="py-3 px-4 border-b">{index + 1}</td>
                  <td className="py-3 px-4 border-b">{user.name}</td>
                  <td className="py-3 px-4 border-b">{user.email}</td>
                  <td className="py-3 px-4 border-b">{user.title}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    {user.division}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    {user.category}
                  </td>
                  <td className="py-3 px-4 border-b capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "solved"
                          ? "bg-green-100 text-green-800"
                          : user.status === "in progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 px-4 text-center text-gray-500 text-lg"
                >
                  No users or issues found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
