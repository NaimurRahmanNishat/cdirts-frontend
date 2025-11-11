import CategoryAdminTable from "@/components/adminComponents/CategoryAdminTable";
import CreateCategoryAdmin from "@/components/adminComponents/CreateCategoryAdmin";
import { AuroraText } from "@/components/ui/aurora-text";

const CategoryAdminManagement = () => {
  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">
            <AuroraText>Category Admin List</AuroraText>
          </h1>
        </div>
        <CreateCategoryAdmin />
      </div>
      {/* category admin table */}
      <div>
        <CategoryAdminTable/>
      </div>
    </div>
  );
};

export default CategoryAdminManagement;
