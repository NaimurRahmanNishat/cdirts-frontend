import { useState } from "react";

interface Issue {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  division: string;
  image: string;
  status: "pending" | "in progress" | "solved";
}

const MyIssues = () => {
  const [issues] = useState<Issue[]>([
    {
      id: 1,
      title: "Water supply problem",
      category: "Water",
      description:
        "Residents are facing water shortages for the last 3 days in this area.",
      location: "Mirpur 10, Dhaka",
      division: "Dhaka",
      image:
        "https://images.unsplash.com/photo-1505489304215-1f36b1b60e45?auto=format&fit=crop&w=800&q=60",
      status: "pending",
    },
    {
      id: 2,
      title: "Frequent power cuts",
      category: "Electricity",
      description:
        "Power goes off every evening for hours, affecting small businesses.",
      location: "Chawkbazar, Chittagong",
      division: "Chittagong",
      image:
        "https://images.unsplash.com/photo-1584270354949-c26b0b4e7b6a?auto=format&fit=crop&w=800&q=60",
      status: "in progress",
    },
    {
      id: 3,
      title: "Gas leak near market",
      category: "Gas",
      description:
        "Strong smell of gas around the main market. Immediate attention needed.",
      location: "Rajpara, Rajshahi",
      division: "Rajshahi",
      image:
        "https://images.unsplash.com/photo-1608571423903-3b16d23f3e1b?auto=format&fit=crop&w=800&q=60",
      status: "solved",
    },
    {
      id: 4,
      title: "Broken road condition",
      category: "Broken Road",
      description:
        "Roads are full of potholes making it hard for vehicles to pass.",
      location: "Sonadanga, Khulna",
      division: "Khulna",
      image:
        "https://images.unsplash.com/photo-1618172193622-6c08fdb9b8f3?auto=format&fit=crop&w=800&q=60",
      status: "in progress",
    },
    {
      id: 5,
      title: "Garbage accumulation issue",
      category: "Other",
      description:
        "Waste has not been collected for a week, causing bad smell and flies.",
      location: "Ambarkhana, Sylhet",
      division: "Sylhet",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11e98b19e2b?auto=format&fit=crop&w=800&q=60",
      status: "pending",
    },
    {
      id: 6,
      title: "Low gas pressure",
      category: "Gas",
      description:
        "Gas pressure is too low for cooking during morning hours.",
      location: "Sadar, Barishal",
      division: "Barishal",
      image:
        "https://images.unsplash.com/photo-1574755393849-623942496936?auto=format&fit=crop&w=800&q=60",
      status: "solved",
    },
  ]);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          My Issues
        </h2>
        <span className="text-gray-600 text-sm md:text-base">
          Total Issues: {issues.length}
        </span>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="w-full h-40 md:h-48 overflow-hidden relative">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {/* Status Badge */}
              <span
                className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  issue.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : issue.status === "in progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {issue.status === "in progress"
                  ? "In Progress"
                  : issue.status.charAt(0).toUpperCase() +
                    issue.status.slice(1)}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {issue.title}
              </h3>

              {/* Category */}
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  issue.category === "Water"
                    ? "bg-blue-100 text-blue-600"
                    : issue.category === "Electricity"
                    ? "bg-yellow-100 text-yellow-600"
                    : issue.category === "Gas"
                    ? "bg-red-100 text-red-600"
                    : issue.category === "Broken Road"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {issue.category}
              </span>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2">
                {issue.description}
              </p>

              {/* Info */}
              <div className="text-sm text-gray-500">
                <p>
                  <strong>📍 Location:</strong> {issue.location}
                </p>
                <p>
                  <strong>🗺️ Division:</strong>{" "}
                  <span className="capitalize">{issue.division}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyIssues;
