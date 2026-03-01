"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84cc16",
];

export default function BudgetSummary({ activities }) {
  const chartData = activities.map((item) => ({
    name: item.task,
    value: Number(item.cost),
  }));

  const total = activities.reduce((sum, item) => sum + Number(item.cost), 0);

  if (activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-gray-100 text-center">
        <p className="text-gray-500 font-medium">No expenses added yet</p>
        <p className="text-gray-400 text-xs mt-1">
          Add activities with cost to see the budget breakdown
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
      <h3 className="font-bold text-gray-800 text-center text-3xl mb-6">Budget Summary</h3>

      {/* Total cost */}
      <div className="bg-gray-50 text-center p-4 rounded-2xl mb-6 border border-gray-100">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
          Total Budget
        </p>
        <p className="text-2xl font-black text-green-700">${total.toFixed(2)}</p>
      </div>

      {/* chat cloer */}
      <div className="h-56 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Expense Details
        </p>
        {chartData.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                {/* Different color for task */}
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></div>
                <span className="text-sm font-semibold text-gray-700 truncate w-32">
                  {item.name}
                </span>
              </div>
              <span className="text-sm font-bold text-green-700">
                ${item.value.toFixed(2)}
              </span>
            </div>
            {/* percentage bar */}
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor: COLORS[i % COLORS.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
