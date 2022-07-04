import moment from "moment";

function isOlderThan24H(date) {
  const now = moment();
  return now.diff(date, "days") > 1;
}

function displayAge(date) {
  return moment(date).fromNow();
}

function displayDate(date) {
  return moment(date).format("dddd, MMMM Do ");
}

export function timestamp(date) {
  if (isOlderThan24H(date)) {
    return displayDate(date);
  } else {
    return displayAge(date);
  }
}
