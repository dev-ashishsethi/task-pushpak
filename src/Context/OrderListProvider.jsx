import { createContext, useContext, useReducer, useState } from "react";
import { filterAction } from "../utils/filterAction";

const OrderListContext = createContext();

export function OrderListProvider({ children }) {
  const [orderList, setOrderList] = useState([]);
  const [radioState, radioDisptach] = useReducer(filterAction,{
    lowToHigh: false,
    highToLow: false,
    // inDelivery: false,
    // delivered: false,
    // processing: false,
    // canceled: false,
    // refund: false,
    orderStatus:""
  });

  return (
    <OrderListContext.Provider value={{radioState, radioDisptach, orderList, setOrderList }}>
      {children}
    </OrderListContext.Provider>
  );
}

export const useOrderList = () => useContext(OrderListContext);
