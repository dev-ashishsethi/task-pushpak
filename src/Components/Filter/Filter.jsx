import { MaterialSymbolsFilterAlt } from "../../assets/icons";
import { useOrderList } from "../../Context/OrderListProvider";
import "./Filter.css";
export function Filter() {
  const { radioState, radioDisptach } = useOrderList();
  return (
    <>
      <button
        className="btn btn-primary d-flex flex-row align-items-center justify-content-between my-2 rounded-pill px-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        <MaterialSymbolsFilterAlt /> Show Filters <span>+</span>
      </button>
      <div className="collapse" id="collapseExample">
        <div className="mt-2">
          <span className="fw-bold">Sort by price </span>
          <div>
            <input
              type="radio"
              name="sort"
              id="LowToHigh"
              checked={radioState.lowToHigh}
              onChange={() => radioDisptach({ type: "lowToHigh" })}
            />
            <label htmlFor="LowToHigh" className="ms-2">
              Low to High
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              id="HighToLow"
              checked={radioState.highToLow}
              onChange={() => radioDisptach({ type: "highToLow" })}
            />
            <label htmlFor="HighToLow" className="ms-2">
              High to Low
            </label>
          </div>
          <div className="mt-2">
            <span className="fw-bold">Filter by order status</span>
            <div>
              <input
                type="radio"
                name="order_status"
                id="InDelivery"
                checked={radioState.orderStatus === "in delivery"}
                onChange={() =>
                  radioDisptach({ type: "orderStatus", payload: "in delivery" })
                }
              />
              <label htmlFor="InDelivery" className="ms-2">
                In delivery
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="order_status"
                id="Delivered"
                checked={radioState.orderStatus === "delivered"}
                onChange={() =>
                  radioDisptach({ type: "orderStatus", payload: "delivered" })
                }
              />
              <label htmlFor="Delivered" className="ms-2">
                Delivered
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="order_status"
                id="Processing"
                checked={radioState.orderStatus === "processing"}
                onChange={() =>
                  radioDisptach({ type: "orderStatus", payload: "processing" })
                }
              />
              <label htmlFor="Processing" className="ms-2">
                Processing
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="order_status"
                id="Canceled"
                checked={radioState.orderStatus === "cancelled"}
                onChange={() =>
                  radioDisptach({ type: "orderStatus", payload: "cancelled" })
                }
              />
              <label htmlFor="Canceled" className="ms-2">
                Canceled
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="order_status"
                id="Refund"
                checked={radioState.orderStatus === "refund"}
                onChange={() =>
                  radioDisptach({ type: "orderStatus", payload: "refund" })
                }
              />
              <label htmlFor="Refund" className="ms-2">
                Refund
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
