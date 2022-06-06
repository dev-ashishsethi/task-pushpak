export function orderStatusFilter(data, radioState) {
  if (data?.length > 0 && radioState.orderStatus === "") {
    return data;
  }
  return data?.length > 0
    ? [...data].filter((obj) => obj.order_status === radioState.orderStatus)
    : data;
}
