import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const options = (text, position, display = false) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: position,
        display: display,
      },
    },
  };
};

function getRandomColor() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    0.75 +
    ")"
  );
}

const arr = [
  "rgba(255, 99, 132, 0.75)",
  "rgba(255, 205, 86, 0.75)",
  "rgba(75, 192, 192, 0.75)",
  "rgba(229, 48, 24, 0.75)",
  "rgba(65, 229, 24, 0.75)",
  "rgba(54, 162, 235, 0.75)",
  "rgba(255, 159, 64, 0.75)",
  "rgba(153, 102, 255, 0.75)",
];

function MoneySpentByMonth() {
  const [data, setData] = useState(null);

  const handleChartChange = (months=3) => {
    const to = new Date().toISOString().split("T")[0];
    const from = new Date(new Date().setMonth(new Date().getMonth()-months)).toISOString().split("T")[0];

    axios
      .post(
        "http://localhost:8080/api/accounts/transactionsbymonth",
        {
          accountNumber: jwtDecode(sessionStorage.getItem("accountNo")).sub,
          from,
          to,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("tokenId"),
          },
        }
      )
      .then((res) =>
        setData({
          labels: res.data.labels,
          datasets: [
            {
              label: "Money Spent per month",
              data: res.data.data,
              backgroundColor: [
                ...arr,
                ...res.data.labels.map(() => getRandomColor()),
              ],
              borderWidth: 2,
              hoverOffset: 15,
            },
          ],
        })
      );
  };

  useEffect(() => {
      handleChartChange();
  }, []);

  return (
    <>
      {data && (
        <>
          <div
            className="card mx-auto shadow mb-4"
            style={{ width: "85%", marginTop: "1%" }}
          >
            <div className="row g-0 d-flex flex-wrap align-items-center">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title text-center">
                    Money Spent Per Month
                  </h3>
                  <Form.Group>
                    <Form.Select defaultValue={3} onChange={(e)=>handleChartChange(e.target.value)}>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>1 Year</option>
                      <option value={24}>2 Years</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <hr />
              </div>
              <Bar
                data={data}
                options={options("Money Spent Per Month", "top")}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MoneySpentByMonth;
