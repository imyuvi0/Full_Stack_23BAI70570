import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard({ setToken }) {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");

  const token = localStorage.getItem("token");

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // FETCH
  const fetchExpenses = async () => {
    const res = await fetch("http://localhost:8080/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (Array.isArray(data)) setExpenses(data);
  };

  // ADD / UPDATE
  const handleSubmit = async () => {
    const url = editId
      ? `http://localhost:8080/api/expenses/${editId}`
      : "http://localhost:8080/api/expenses";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        amount,
        category,
        date: new Date(),
      }),
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setEditId(null);

    fetchExpenses();
  };

  // DELETE
  const deleteExpense = async (id) => {
    await fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchExpenses();
  };

  // EDIT
  const editExpense = (e) => {
    setTitle(e.title);
    setAmount(e.amount);
    setCategory(e.category);
    setEditId(e.id);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ===== CALCULATIONS =====

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const average = expenses.length
    ? (total / expenses.length).toFixed(2)
    : 0;

  const highest = expenses.reduce(
    (max, e) => (e.amount > max.amount ? e : max),
    { amount: 0 }
  );

  const recent = [...expenses].slice(-3).reverse();

  const categoryData = {};
  expenses.forEach((e) => {
    categoryData[e.category] =
      (categoryData[e.category] || 0) + Number(e.amount);
  });

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#ef4444",
          "#f59e0b",
          "#06b6d4",
        ],
      },
    ],
  };

  // ===== MONTHLY GRAPH =====

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyData = new Array(12).fill(0);

  expenses.forEach((e) => {
    if (e.date) {
      const month = new Date(e.date).getMonth();
      monthlyData[month] += Number(e.amount);
    }
  });

  const barData = {
    labels: monthNames,
    datasets: [
      {
        label: "Monthly Spending",
        data: monthlyData,
        backgroundColor: "#6366f1",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-purple-600">
          💸 Tracker
        </h2>

        <ul className="space-y-5 text-gray-600">
          <li onClick={() => setActivePage("dashboard")} className="cursor-pointer hover:text-purple-600">Dashboard</li>
          <li onClick={() => setActivePage("expenses")} className="cursor-pointer hover:text-purple-600">Expenses</li>
          <li onClick={() => setActivePage("reports")} className="cursor-pointer hover:text-purple-600">Reports</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center bg-white px-8 py-4 shadow-md">
          <h1 className="text-2xl font-bold capitalize">
            {activePage}
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8 overflow-auto flex-1">

          {/* DASHBOARD */}
          {activePage === "dashboard" && (
            <>
              <div className="grid grid-cols-4 gap-6 mb-6">

                <div className="bg-purple-500 text-white p-6 rounded-xl">
                  ₹{total}
                </div>

                <div className="bg-blue-500 text-white p-6 rounded-xl">
                  ₹{average}
                </div>

                <div className="bg-red-500 text-white p-6 rounded-xl">
                  ₹{highest.amount}
                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl">
                  {expenses.length}
                </div>

              </div>

              <div className="grid grid-cols-3 gap-6">

                {/* MONTH GRAPH */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="mb-2">Monthly Spending</p>
                  <div className="h-40">
                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                  </div>
                </div>

                {/* RECENT */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="mb-3">Recent</p>
                  {recent.map((r) => (
                    <div key={r.id} className="flex justify-between">
                      <span>{r.title}</span>
                      <span>₹{r.amount}</span>
                    </div>
                  ))}
                </div>

                {/* PIE */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <Pie data={chartData} />
                </div>

              </div>
            </>
          )}

          {/* EXPENSES */}
          {activePage === "expenses" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow mb-4 max-w-xl">
                <input className="border p-2 w-full mb-2" placeholder="Title"
                  value={title} onChange={(e)=>setTitle(e.target.value)} />

                <input className="border p-2 w-full mb-2" placeholder="Amount"
                  value={amount} onChange={(e)=>setAmount(e.target.value)} />

                <input className="border p-2 w-full mb-3" placeholder="Category"
                  value={category} onChange={(e)=>setCategory(e.target.value)} />

                <button onClick={handleSubmit}
                  className="bg-purple-500 text-white w-full py-2 rounded">
                  {editId ? "Update" : "Add"}
                </button>
              </div>

              {expenses.map((e)=>(
                <div key={e.id}
                  className="bg-white p-4 rounded-xl shadow mb-2 flex justify-between max-w-xl">
                  <div>
                    <p>{e.title}</p>
                    <p className="text-sm">{e.category}</p>
                  </div>

                  <div className="flex gap-2">
                    <span>₹{e.amount}</span>

                    <button onClick={()=>editExpense(e)}
                      className="bg-blue-500 text-white px-2 rounded">Edit</button>

                    <button onClick={()=>deleteExpense(e.id)}
                      className="bg-red-500 text-white px-2 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* REPORTS */}
          {activePage === "reports" && (
            <div className="bg-white p-6 rounded-xl shadow max-w-xl">

              <Pie data={chartData} />

              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left">Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(categoryData).map(([cat, amt]) => (
                    <tr key={cat}>
                      <td>{cat}</td>
                      <td>₹{amt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-4">Total: ₹{total}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;