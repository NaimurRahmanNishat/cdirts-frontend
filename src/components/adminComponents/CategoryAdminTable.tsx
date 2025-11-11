import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetAllUsersAndCategoryAdminsQuery,
  useUpdateCategoryAdminMutation,
  useDeleteCategoryAdminMutation,
} from "@/redux/features/auth/authApi";
import Loading from "../shared/Loading";
import type { CategoryType, DivisionType } from "@/types/authType";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CategoryAdmin {
  _id: string;
  name: string;
  email: string;
  division?: DivisionType;
  category?: CategoryType;
  role?: string;
}

const CategoryAdminTable = () => {
  const { data, isLoading, isError, refetch } =
    useGetAllUsersAndCategoryAdminsQuery();
  const [updateCategoryAdmin, { isLoading: updating }] =
    useUpdateCategoryAdminMutation();
  const [deleteCategoryAdmin] = useDeleteCategoryAdminMutation();

  const admins: CategoryAdmin[] = data?.data || [];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<CategoryAdmin | null>(
    null
  );
  const [newCategory, setNewCategory] = useState("");
  const [newDivision, setNewDivision] = useState<DivisionType | "">("");
  const [updatingAdminId, setUpdatingAdminId] = useState<string | null>(null);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);

  // Update Modal Open
  const handleUpdateClick = (admin: CategoryAdmin) => {
    setSelectedAdmin(admin);
    setNewCategory(admin.category || "");
    setNewDivision(admin.division || "");
    setIsOpen(true);
  };

  // Category Update Function
  const handleUpdate = async () => {
    if (!selectedAdmin || !newCategory || !newDivision) {
      toast.error("Please select both division and category!");
      return;
    }

    try {
      setUpdatingAdminId(selectedAdmin._id);
      await updateCategoryAdmin({
        _id: selectedAdmin._id,
        category: newCategory as CategoryType,
        division: newDivision as DivisionType,
      }).unwrap();

      toast.success("Category updated successfully!");
      setIsOpen(false);
      refetch();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update category admin!");
    } finally {
      setUpdatingAdminId(null);
    }
  };

  // ✅ Delete Function (optimized for per-row loading)
  const handleDelete = async (id: string) => {
    if (!confirm){ 
      toast.info("Are you sure you want to delete this category admin!");
      return;}

    try {
      setDeletingAdminId(id); 
      await deleteCategoryAdmin(id).unwrap();
      toast.success("Category admin deleted successfully!");
      await refetch();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete category admin!");
    } finally {
      setDeletingAdminId(null);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-600">
        Failed to load data. Please try again.
      </div>
    );

  return (
    <div className="w-full min-h-screen pt-4 md:pt-8 lg:pt-12">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Category Admins
          </h2>
          <span className="text-sm text-gray-500">Total: {admins.length}</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm sm:text-base">
            <thead className="bg-pink-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Division</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((admin, index) => (
                <tr
                  key={admin._id}
                  className="hover:bg-gray-100 transition-all duration-150"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-800">{admin.name}</td>
                  <td className="px-4 py-3 text-gray-700">{admin.email}</td>
                  <td className="px-4 py-3 text-gray-700">{admin.division}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        admin.category === "water"
                          ? "bg-blue-100 text-blue-600"
                          : admin.category === "electricity"
                          ? "bg-yellow-100 text-yellow-600"
                          : admin.category === "gas"
                          ? "bg-red-100 text-red-600"
                          : admin.category === "broken-road"
                          ? "bg-gray-100 text-gray-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {admin.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateClick(admin)}
                      className="px-3 py-1 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-60"
                      disabled={updatingAdminId === admin._id}
                    >
                      {updatingAdminId === admin._id ? "Updating..." : "Update"}
                    </button>

                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="px-3 py-1 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 transition disabled:opacity-60"
                      disabled={deletingAdminId === admin._id}
                    >
                      {deletingAdminId === admin._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 text-center text-gray-500 text-sm border-t border-gray-200">
          Showing {admins.length} results
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selectedAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Update Category Admin
              </h3>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <p className="text-gray-600 text-sm mb-1">Admin Name:</p>
                  <p className="font-medium text-gray-800">
                    {selectedAdmin.name}
                  </p>
                </div>

                {/* Division Select */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Division
                  </label>
                  <Select
                    value={newDivision}
                    onValueChange={(value) =>
                      setNewDivision(value as DivisionType)
                    }
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <SelectValue placeholder="Select a division" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Dhaka",
                        "Chattogram",
                        "Rajshahi",
                        "Khulna",
                        "Barishal",
                        "Sylhet",
                        "Rangpur",
                        "Mymensingh",
                      ].map((div) => (
                        <SelectItem key={div} value={div}>
                          {div}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Category
                  </label>
                  <Select
                    value={newCategory}
                    onValueChange={(value) =>
                      setNewCategory(value as CategoryType)
                    }
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "water",
                        "electricity",
                        "gas",
                        "broken-road",
                        "other",
                      ].map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleUpdate}
                  disabled={updating}
                  className="w-full py-2 bg-pink-600 cursor-pointer text-white rounded-md hover:bg-pink-700 transition disabled:opacity-60"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryAdminTable;
