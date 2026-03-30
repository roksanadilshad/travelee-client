
// "use client";

// import React, { useState, useEffect } from "react";
// import { Users, Loader2, BookOpenCheck, TrendingUp } from "lucide-react";
// import AnalyticsPage from "../analytics/page";


// const StatCard = ({ title, value, change, icon: Icon, bgColor, textColor, loading }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
//     <div className="flex justify-between items-start">
//       <div className={`p-3 rounded-xl ${bgColor} bg-opacity-10`}>
//         <Icon className={`w-6 h-6 ${textColor}`} />
//       </div>
//       <span className={`text-xs font-medium px-2 py-1 rounded-full ${change.includes("+") ? "bg-teal-100 text-green-600" : "bg-red-50 text-red-600"}`}>
//         {change}
//       </span>
//     </div>
//     <div className="mt-4">
//       <p className="text-gray-500 text-sm font-medium">{title}</p>
//       {loading ? (
//         <div className="h-8 w-24 bg-gray-100 animate-pulse rounded mt-1" />
//       ) : (
//         <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
//       )}
//     </div>
//   </div>
// );

// const AdminBrowse = () => {
//   const [totalTrips, setTotalTrips] = useState(0);
//   const [uniqueCustomers, setUniqueCustomers] = useState(0);
//   const [totalEarnings, setTotalEarnings] = useState(0);
//   const [chartData, setChartData] = useState([]);
//   const [pieData, setPieData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trip`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         const result = await res.json();

//         if (result.success) {
//           const allTrips = result.data || [];
//           setTotalTrips(result.total || allTrips.length);

          
//           const emails = allTrips.map(trip => trip.userEmail).filter(Boolean);
//           setUniqueCustomers(new Set(emails).size);

          
//           const earnings = allTrips.reduce((sum, item) => sum + (item.avgBudget ? 200 : 50), 0);
//           setTotalEarnings(earnings);

         
//           const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//           const formattedChartData = days.map((day, index) => {
//             const count = allTrips.filter(t => new Date(t.createdAt).getDay() === index).length;
//             return { name: day, revenue: count * 200 };
//           });
//           setChartData(formattedChartData);

          
//           const countryCounts = {};
//           allTrips.forEach(t => {
//             if (t.country) countryCounts[t.country] = (countryCounts[t.country] || 0) + 1;
//           });

//           const formattedPieData = Object.keys(countryCounts).map(country => ({
//             name: country,
//             value: Math.round((countryCounts[country] / (allTrips.length || 1)) * 100)
//           })).sort((a, b) => b.value - a.value).slice(0, 10);

//           setPieData(formattedPieData.length > 0 ? formattedPieData : [{name: "No Data", value: 100}]);
//         }
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-[#F9FAFB] min-h-screen">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800 text-left uppercase tracking-tight">Admin Console</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard 
//           title="Total Bookings" 
//           value={totalTrips.toLocaleString()} 
//           change="+2.4%" 
//           icon={BookOpenCheck} 
//           bgColor="bg-sky-100" textColor="text-teal-400"
//           loading={loading} 
//         />
//         <StatCard 
//           title="Unique Customers" 
//           value={uniqueCustomers.toLocaleString()} 
//           change="+1.8%" 
//           icon={Users} 
//           bgColor="bg-sky-100" textColor="text-teal-400" 
//           loading={loading}
//         />
//         <StatCard 
//           title="Potential Revenue" 
//           value={`$${totalEarnings.toLocaleString()}`} 
//           change="+4.2%" 
//           icon={TrendingUp} 
//           bgColor="bg-sky-100" textColor="text-teal-500" 
//           loading={loading} 
//         />
//       </div>

//       {/* Analytics Section */}
//       <section>
//         <AnalyticsPage
//           totalTrips={totalTrips} 
//           chartData={chartData} 
//           pieData={pieData} 
//         />
//       </section>

//       {loading && (
//         <div className="fixed bottom-10 right-10">
//           <Loader2 className="animate-spin text-[#0EA5A4]" size={30} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBrowse;

"use client";

import React, { useState, useEffect } from "react";
import { Users, Loader2, BookOpenCheck, TrendingUp } from "lucide-react";
import AnalyticsPage from "../analytics/page"; 

const StatCard = ({ title, value, change, icon: Icon, bgColor, textColor, loading }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${bgColor} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${textColor}`} />
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded-full bg-teal-50 text-teal-600`}>
        {change}
      </span>
    </div>
    <div className="mt-4">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      {loading ? (
        <div className="h-8 w-24 bg-gray-100 animate-pulse rounded mt-1" />
      ) : (
        <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
      )}
    </div>
  </div>
);

const AdminBrowse = () => {
  const [totalTrips, setTotalTrips] = useState(0);
  const [uniqueCustomers, setUniqueCustomers] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        
    
        const cleanUrl = `${baseUrl}/api/trip`.replace(/([^:]\/)\/+/g, "$1");

        const res = await fetch(cleanUrl, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const result = await res.json();

        if (result.success && result.data) {
          const allTrips = result.data;
          setTotalTrips(allTrips.length);

          
          const emails = allTrips.map(trip => trip.userEmail).filter(Boolean);
          setUniqueCustomers(new Set(emails).size);

          
          const earnings = allTrips.reduce((sum, item) => sum + (item.avgBudget ? 200 : 50), 0);
          setTotalEarnings(earnings);

          
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const formattedChart = days.map((day, idx) => {
            const count = allTrips.filter(t => new Date(t.createdAt).getDay() === idx).length;
            return { name: day, revenue: count * 200 };
          });
          setChartData(formattedChart);

         
          const countryCounts = {};
          allTrips.forEach(t => {
            if (t.country) countryCounts[t.country] = (countryCounts[t.country] || 0) + 1;
          });

          const formattedPie = Object.keys(countryCounts).map(country => ({
            name: country,
            value: Math.round((countryCounts[country] / (allTrips.length || 1)) * 100)
          })).sort((a, b) => b.value - a.value).slice(0, 10);

          setPieData(formattedPie.length > 0 ? formattedPie : [{name: "No Data", value: 100}]);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 text-left uppercase tracking-tight">Admin Console</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Bookings" value={totalTrips.toLocaleString()} change="+2.4%" icon={BookOpenCheck} bgColor="bg-sky-100" textColor="text-teal-400" loading={loading} />
        <StatCard title="Unique Customers" value={uniqueCustomers.toLocaleString()} change="+1.8%" icon={Users} bgColor="bg-sky-100" textColor="text-teal-400" loading={loading} />
        <StatCard title="Potential Revenue" value={`$${totalEarnings.toLocaleString()}`} change="+4.2%" icon={TrendingUp} bgColor="bg-sky-100" textColor="text-teal-500" loading={loading} />
      </div>

      <section>
        <AnalyticsPage totalTrips={totalTrips} chartData={chartData} pieData={pieData} />
      </section>

      {loading && (
        <div className="fixed bottom-10 right-10">
          <Loader2 className="animate-spin text-[#0EA5A4]" size={30} />
        </div>
      )}
    </div>
  );
};

export default AdminBrowse;