import { MoreVertical, ChevronRight, Plus, Check } from "lucide-react";

const UserDashboardMain = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* ====== Top Section ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* My Statistics */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  My Statistics
                </h3>
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                    January
                  </span>
                  <span className="text-indigo-600 font-semibold text-lg sm:text-xl">
                    + 9,500
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Monthly Issue", width: "60%", value: "+ 4,300" },
                    { label: "Fixed Monthly Issue", width: "20%", value: "+ 530" },
                    { label: "Unexpected Issue", width: "10%", value: "+ 7,500" },
                    { label: "Total Issue", width: "35%", value: "+ 2,300" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <div className="flex-1 mx-2 sm:mx-4">
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: item.width }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-indigo-600 font-semibold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 bg-indigo-600 text-white py-2 sm:py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm sm:text-base">
                  More detail
                </button>
              </div>
            </div>

            {/* My Cards */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  My Cards
                </h3>
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="space-y-6">
                {/* Card 1 */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-4 sm:p-6 text-white shadow-lg">
                  <div className="flex justify-between items-start mb-6 sm:mb-8">
                    <div className="space-y-1">
                      <div className="w-10 sm:w-12 h-2 bg-white/30 rounded"></div>
                      <div className="w-6 sm:w-8 h-2 bg-white/30 rounded"></div>
                    </div>
                    <div className="w-8 sm:w-10 h-6 sm:h-8 bg-white/20 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full -ml-3 sm:-ml-4"></div>
                  </div>
                  <div className="text-xs sm:text-sm opacity-90 mb-1">6510 6563 4751 XXXX</div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">EXPENSES</p>
                      <p className="text-xs text-gray-400">January</p>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-end gap-2 mb-4">
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-600">↑ 12%</div>
                    <span className="text-xs text-gray-400 mb-1">than Dec. 2021</span>
                  </div>
                  <div className="h-20 flex items-end gap-1">
                    {[30, 45, 35, 50, 40, 55, 45, 60, 50, 65, 55, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-indigo-200 rounded-t"
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====== Middle Section ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* My Investments */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  My Investments
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Card 1 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Trust fund</h4>
                      <p className="text-xs text-gray-400">Bank name</p>
                    </div>
                    <div className="text-right">
                      <div className="text-indigo-600 font-bold text-sm sm:text-lg">↑ 10%</div>
                      <p className="text-xs text-gray-400">interest rate</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-green-500 text-xl sm:text-2xl font-bold">$ 7,500</span>
                      <p className="text-xs text-green-500">Invested</p>
                    </div>
                    <div>
                      <span className="text-green-500 text-xl sm:text-2xl font-bold">$ 1,100</span>
                      <p className="text-xs text-green-500">Profit</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">Stocks</h4>
                      <p className="text-xs text-gray-400">Company name</p>
                    </div>
                    <div className="text-right">
                      <div className="text-red-500 font-bold text-sm sm:text-lg">↓ 0.1%</div>
                      <p className="text-xs text-gray-400">interest rate</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-pink-500 text-xl sm:text-2xl font-bold">$ 1,200</span>
                      <p className="text-xs text-pink-500">Invested</p>
                    </div>
                    <div>
                      <span className="text-pink-500 text-xl sm:text-2xl font-bold">- $ 520</span>
                      <p className="text-xs text-pink-500">Profit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transactions */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="invisible">Placeholder</div>
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
                <div className="space-y-3">
                  {[
                    { name: "Shop Name", amount: "- 2,000", date: "18 Jan", color: "text-red-500" },
                    { name: "Credit", amount: "+ 15,000", date: "17 Jan", color: "text-green-500" },
                    { name: "Shop Name", amount: "- 12,000", date: "15 Jan", color: "text-red-500" },
                  ].map((t, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-400">{t.date}</p>
                      </div>
                      <span className={`font-semibold ${t.color}`}>{t.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ====== Bottom Section ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Income History */}
            <div>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  Income History
                </h3>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs text-gray-400">2021</p>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative h-32">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                      points="0,70 50,60 100,65 150,55 200,50 250,45 300,40 350,35 400,30"
                    />
                  </svg>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Card */}
            <div>
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs opacity-90 mb-1">BALANCE</p>
                    <p className="text-xs opacity-90">January</p>
                  </div>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="text-4xl sm:text-5xl font-bold mb-6">$ 5,320</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Great!</p>
                    <p className="text-xs opacity-90">You have no upcoming payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardMain;
