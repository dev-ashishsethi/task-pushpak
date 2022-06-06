export function filterAction(state, action) {
  switch (action.type) {
    case "lowToHigh":
      return { ...state, lowToHigh: true, highToLow: false };

    case "highToLow":
      return { ...state, lowToHigh: false, highToLow: true };
    case "orderStatus":
      return { ...state, orderStatus: action.payload };

    default:
      break;
  }
}
