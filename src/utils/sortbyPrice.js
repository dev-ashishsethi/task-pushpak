export function sortbyPrice(data, radioState) {
  return radioState.lowToHigh
    ? data.sort((obj, obj1) => Number(obj.amount) - Number(obj1.amount))
    : radioState.highToLow
    ? data.sort((obj, obj1) => Number(obj1.amount) - Number(obj.amount))
    : data;
}
