import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

import "./Admin.css";

function AdminHome() {

  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    totalOrders: 0,
    delivered: 0,
    pending: 0,
    chartData: []
  });

  useEffect(() => {
    axios
      .get("https://dotandkey.onrender.com/admin-stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="admin-home">

      <h2>Dashboard</h2>

      <div className="stats">

        <div className="card">
          <h3>{stats.products}</h3>
          <p>Products</p>
        </div>

        <div className="card">
          <h3>{stats.totalOrders}</h3>
          <p>Orders</p>
        </div>

        <div className="card">
          <h3>{stats.users}</h3>
          <p>Users</p>
        </div>

      </div>

      <div className="charts">

        <div className="chart-box">
          <h4>Orders Trend</h4>

          <LineChart
            width={400}
            height={250}
            data={stats.chartData}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#ab12ef"
            />
          </LineChart>
        </div>

        <div className="chart-box">

          <h4>Order Status</h4>

          <PieChart width={300} height={250}>

            <Pie
              data={[
                {
                  name: "Delivered",
                  value: stats.delivered
                },
                {
                  name: "Pending",
                  value: stats.pending
                }
              ]}
              dataKey="value"
              outerRadius={80}
            >

              <Cell fill="#604caf" />
              <Cell fill="#5dd754" />

            </Pie>

          </PieChart>

        </div>

      </div>

    </div>
  );
}

export default AdminHome;