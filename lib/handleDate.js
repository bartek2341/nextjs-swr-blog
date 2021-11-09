export const getCurrentDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return year + "-" + month;
};

export function dateRange(startDate, endDate) {
  var start = startDate.split("-");
  var end = endDate.split("-");
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? "0" + month : month;
      dates.push([i, displayMonth].join("-"));
    }
  }
  return dates;
}

export const formatDate = (string) => {
  const date = new Date(string);
  return new Intl.DateTimeFormat("pl", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

export const getMonthDate = (string) => {
  const date = new Date(string);
  return date.toISOString().split("T")[0];
};

export const sortDatesByNewest = (dates) => {
  return dates.sort(function compare(a, b) {
    return new Date(b) - new Date(a);
  });
};
