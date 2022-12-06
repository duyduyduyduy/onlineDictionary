const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const handleTimeAll = (string) => {
  let newDate = new Date(string);
  let info = {
    day: weekday[newDate.getDay()],
    month: month[newDate.getMonth()],
    date: newDate.getDate(),
    hour: newDate.getHours(),
    minute: newDate.getMinutes(),
    year: newDate.getFullYear(),
  };
  return info;
};
let Date_title = document.getElementById("Date");

Date_title.innerHTML = ` ${handleTimeAll(new Date()).date} ${
  handleTimeAll(new Date()).month
} ${handleTimeAll(new Date()).year}`;
console.log(handleTimeAll(new Date()).day);
