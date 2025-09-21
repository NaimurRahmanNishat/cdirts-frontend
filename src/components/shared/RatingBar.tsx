import React from "react";

interface RatingBarProps {
  stars: number;
  percent: number;
  count: number;
  color: string;
}

const RatingBar: React.FC<RatingBarProps> = ({ stars, percent, count, color }) => {
  return (
    <div className="flex items-center w-full gap-2">
      {/* Star label */}
      <div className="w-16">{stars} star</div>

      {/* Progress bar */}
      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded">
          <div
            className={`h-4 rounded ${color}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>

      {/* Review count */}
      <div className="w-12 text-right">{count}</div>
    </div>
  );
};

export default RatingBar;