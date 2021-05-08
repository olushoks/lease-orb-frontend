const months = [
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

const getDate = (dateTimeString) => {
  let [splitDate] = dateTimeString.split("T");
  let [year, month, day] = splitDate.split("-");

  let daySplit = day.toString().split("");
  day = daySplit[0] === "0" ? daySplit[1] : day;

  let date = `${months[month - 1]} ${day}, ${year}`;
  return date;
};

export default getDate;
