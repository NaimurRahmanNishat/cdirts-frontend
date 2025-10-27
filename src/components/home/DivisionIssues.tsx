import { AuroraText } from "../ui/aurora-text";

interface DivisionIssuesProps {
  name: string;
}

const Divisions: DivisionIssuesProps[] = [
  { name: "Dhaka" },
  { name: "Chittagong" },
  { name: "Rajshahi" },
  { name: "Khulna" },
  { name: "Barishal" },
  { name: "Sylhet" },
  { name: "Rangpur" },
  { name: "Mymensingh" },
];

const DivisionIssues = () => {
  return (
    <section>
      {/* Title */}
      <h1 className="font-bold text-3xl md:text-4xl text-center mb-10">
        <AuroraText>Division Issues</AuroraText>
      </h1>

      {/* Grid of Divisions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Divisions.map((division, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {division.name}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              View issues reported from {division.name}.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DivisionIssues;
