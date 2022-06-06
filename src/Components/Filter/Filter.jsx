import { MaterialSymbolsFilterAlt } from "../../assets/icons";
import { useOrderList } from "../../Context/OrderListProvider";
import "./Filter.css";
export function Filter() {
  const { radioState, radioDisptach } = useOrderList();
  return (
    <button>
      <MaterialSymbolsFilterAlt /> Show Filters <span>+</span>
      <div className="filters">
        <p>Sort by price </p>
        <input
          type="radio"
          name="sort"
          id="LowToHigh"
          checked={radioState.lowToHigh}
          onChange={() => radioDisptach({ type: "lowToHigh" })}
        />
        <label htmlFor="LowToHigh">Low to High</label>
        <input
          type="radio"
          name="sort"
          id="HighToLow"
          checked={radioState.highToLow}
          onChange={() => radioDisptach({ type: "highToLow" })}
        />
        <label htmlFor="HighToLow">High to Low</label>
        <div>
          <p>Filter by order status</p>
          <input
            type="radio"
            name="order_status"
            id="InDelivery"
            checked={radioState.orderStatus === "in delivery"}
            onChange={() =>
              radioDisptach({ type: "orderStatus", payload: "in delivery" })
            }
          />
          <label htmlFor="InDelivery">In delivery</label>
          <input
            type="radio"
            name="order_status"
            id="Delivered"
            checked={radioState.orderStatus === "delivered"}
            onChange={() =>
              radioDisptach({ type: "orderStatus", payload: "delivered" })
            }
          />
          <label htmlFor="Delivered">Delivered</label>
          <input
            type="radio"
            name="order_status"
            id="Processing"
            checked={radioState.orderStatus === "processing"}
            onChange={() =>
              radioDisptach({ type: "orderStatus", payload: "processing" })
            }
          />
          <label htmlFor="Processing">Processing</label>
          <input
            type="radio"
            name="order_status"
            id="Canceled"
            checked={radioState.orderStatus === "cancelled"}
            onChange={() =>
              radioDisptach({ type: "orderStatus", payload: "cancelled" })
            }
          />
          <label htmlFor="Canceled">Canceled</label>
          <input
            type="radio"
            name="order_status"
            id="Refund"
            checked={radioState.orderStatus === "refund"}
            onChange={() =>
              radioDisptach({ type: "orderStatus", payload: "refund" })
            }
          />
          <label htmlFor="Refund">Refund</label>
        </div>
      </div>
    </button>
  );
}
