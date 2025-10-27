import { Line } from "react-chartjs-2";
import "chart.js/auto";
import type { AdminStatsResponse, MonthlyIssue } from "@/redux/features/stats/statsApi";

interface LineChartProps {
  stats: AdminStatsResponse["data"];
}

const LineChart = ({ stats }: LineChartProps) => {
  const monthlyIssues: MonthlyIssue[] = stats.monthlyIssues || [];

  const monthlyData = new Array(12).fill(0);

  monthlyIssues.forEach((item: MonthlyIssue) => {
    const monthIndex = item.month - 1;
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyData[monthIndex] = item.count;
    }
  });

  const lineData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Monthly Issues",
        data: monthlyData,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "#36A2EB",
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="max-h-96 md:h-96 w-full p-4">
      <Line data={lineData} options={options} />
    </div>
  );
};

export default LineChart;
