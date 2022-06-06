import axios from "axios";
import { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Filter } from "../../Components/Filter/Filter";
import { OrderTable } from "../../Components/OrderTable/OrderTable";
import { useOrderList } from "../../Context/OrderListProvider";
import { orderStatusFilter } from "../../utils/orderStatusFilter";
import { sortbyPrice } from "../../utils/sortbyPrice";

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
    <div className="container">
      <div className="row">
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
      </div>
    </div>
  );
}
