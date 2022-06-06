import axios from "axios";
import { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { CilBell, MdiMagnify } from "../../assets/icons";
import { Filter } from "../../Components/Filter/Filter";
import { OrderTable } from "../../Components/OrderTable/OrderTable";
import { useOrderList } from "../../Context/OrderListProvider";
import { orderStatusFilter } from "../../utils/orderStatusFilter";
import { sortbyPrice } from "../../utils/sortbyPrice";
import "./Dashboard.css";

export function Dashboard() {
  const [newOrders, setNewOrders] = useState();
  const [averageSales, setAverageSales] = useState();
  const [totalEarnings, setTotalEarnings] = useState();
  const [summary, setSummary] = useState([]);
  const [chartData, setChartData] = useState([]);
  const { radioState, setOrderList } = useOrderList();
  const [moreOrders, setMoreOrders] = useState(15);

  function fetchOrderList() {
    setMoreOrders((moreOrders) => (moreOrders += 15));
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://13.76.214.165:8001/api/analytics/summary",
          data: {},
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM",
          },
        });
        setNewOrders(response.data.data.overview.new_orders[0].new_orders);
        setAverageSales(
          "$" +
            Number(
              response.data.data.overview.average_sale[0].average_sale
            ).toFixed(2)
        );
        setTotalEarnings(
          "$" + response.data.data.overview.total_earnings[0].total_earnings
        );
        setSummary(response.data.data.summary);
      } catch (error) {
        console.error("lol", error);
      }
    })();

    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: "http://13.76.214.165:8001/api/analytics/last7Days",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM",
          },
        });
        const objKeys = Object?.keys(response.data.data.last7Days);
        const objValues = Object?.values(response.data.data.last7Days);
        let obj = [];
        for (let index = 0; index < objKeys.length; index++) {
          obj.push({
            date:
              new Date(objKeys[index]).getUTCDate() +
              " " +
              objKeys[index].split(" ")[0],
            revenue: objValues[index],
          });
        }
        setChartData(obj);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `http://13.76.214.165:8001/api/orders?page=1&limit=${moreOrders}`,
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM",
          },
        });
        let filteredData = orderStatusFilter(response.data.data, radioState);
        filteredData = sortbyPrice(filteredData, radioState);
        setOrderList(filteredData);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [moreOrders, radioState]);
  return (
    <div className="d-flex flex-row p-5 flex-wrap">
      {/* <div className="row">
        <div className="col">
          Overview Shop
          <div>
            <p>New Orders</p>
            <h3>{newOrders}</h3>
          </div>
          <div>
            <p>Average Sale</p>
            <h3>{averageSales}</h3>
          </div>
          <div>
            <p>Total Earnings</p>
            <h3>{totalEarnings}</h3>
          </div>
          <div>
            {summary.map((summary) => (
              <div>
                <p>{summary.order_status}</p>
                <p>{summary.count}</p>
              </div>
            ))}
          </div>
          <LineChart width={400} height={400} data={chartData}>
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <XAxis dataKey="date" interval={"preserveStartEnd"} />
            <YAxis></YAxis>
            <Tooltip />
          </LineChart>
        </div>
        <div className="col">
          <p>Latest Orders</p>
          <Filter />
          <OrderTable />
          <button onClick={fetchOrderList} className="btn btn-primary">
            More Orders
          </button>
        </div>
      </div> */}

      <div className="col-lg-4 col-12 d-flex flex-column">
        <h3>Welcome</h3>
        <h1>Overview Shop</h1>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          <div className="m-1 border rounded d-flex flex-column justify-content-between px-3 py-2 ui-overview-card">
            <h4>New Orders</h4>
            <h4>{newOrders}</h4>
          </div>
          <div className="m-1 border rounded d-flex flex-column justify-content-between px-3 py-2 ui-overview-card">
            <h4>Average Sale</h4>
            <h4>{averageSales}</h4>
          </div>
          <div className="m-1 border rounded d-flex flex-column justify-content-between px-3 py-2 ui-overview-card">
            <h4>Total Earnings</h4>
            <h4>{totalEarnings}</h4>
          </div>
        </div>
        <div className="rounded bg-light my-3 p-3 d-flex flex-row ui-dashboard-orders-stats">
          <div className="col-3 progressbar  d-flex align-items-center justify-content-center">
            <div class="progress w-100">
              <div
                className="progress-bar bg-warning"
                style={{ width: "10%" }}
                role="progressbar"
                aria-valuenow="15"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                aria-valuenow="30"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "30%" }}
              ></div>
              <div
                className="progress-bar bg-info"
                role="progressbar"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "10%" }}
              ></div>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "25%" }}
              ></div>
              <div
                className="progress-bar bg-info"
                role="progressbar"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>
          <div className="col-9 ui-progess-data d-flex flex-column justify-content-between">
            {summary.map((summary) => (
              <div class="d-flex flex-row fs-5">
                <span class="col-1">Icon</span>
                <span class="col-9">{summary.order_status}</span>
                <span class="col-1">{summary.count}</span>
                <span class="col-1 text-secondary">{summary.count}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded my-3 p-3 w-100 d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex flex-row w-100 align-items-center justify-content-end">
            <div className="nav mb-2">
              <div className="border-bottom border-primary p-1 m-1">
                <h5 className="text-dark">Revenue</h5>
              </div>
              <div className="p-1 m-1">
                <h5 className="text-primary">Orders</h5>
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end dropdown mb-2">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Last 7 Days
              </button>
            </div>
            <div></div>
          </div>
          <LineChart height={400} width={400} data={chartData}>
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <XAxis dataKey="date" interval={"preserveStartEnd"} />
            <YAxis></YAxis>
            <Tooltip />
          </LineChart>
        </div>
      </div>
      <div className="col-1"></div>
      <div className="col-lg-7 col-12 bg-light rounded-5 p-2 px-4 d-flex flex-column">
        <div className="d-flex flex-row align-items-center justify-content-end">
          <MdiMagnify className="mx-2 fs-5" />
          <CilBell className="mx-2 fs-5" />
        </div>
        <h3>Latest Orders</h3>
        <Filter />
        <OrderTable />
        <div className="m-2 d-flex flex-row align-items-center justify-content-end">
          <button onClick={fetchOrderList} className="btn btn-primary rounded-pill p-2 px-5">
            More Orders
          </button>
        </div>
      </div>
    </div>
  );
}
// height: 160px;
// border: 1px solid black;
// justify-content: space-between;
// padding: 0.5rem 1rem;
// width: 120px;
