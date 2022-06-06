import { MaterialSymbolsChevronRight } from "../../assets/icons";
import { useOrderList } from "../../Context/OrderListProvider";
import "./OrderTable.css";
export function OrderTable() {
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { orderList } = useOrderList();
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>ID</th>
          <th>Billing Name</th>
          <th>Amount</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {orderList.map((order, index) => (
          <tr
            key={index}
            className="border-bottom bg-white"
            style={{ height: "40px" }}
          >
            <td className="ms-2">
              {month[new Date(order.date).getMonth()] +
                " " +
                new Date(order.date).getDate()}
            </td>
            <td>{order.id}</td>
            <td>{order.billing_name}</td>
            <td>{order.amount}</td>
            <td>{order.order_status}</td>  
            <td className="me-2"><MaterialSymbolsChevronRight /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
