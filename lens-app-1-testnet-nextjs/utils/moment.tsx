import moment from "moment";

export function isOlderThan24H(date) {
  const now = moment();
  const createdAt = moment(date).format("dddd, MMMM Do ,");
  console.log("AGE", now.diff(date, "days"));
  return now.diff(date, "days") > 1;
}
