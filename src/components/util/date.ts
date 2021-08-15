import dayjs from "dayjs";

export const todayToString = (date: number) => {
  const todayString = date.toString();
  const toString =
    todayString.slice(0, 4) +
    "-" +
    todayString.slice(4, 6) +
    "-" +
    todayString.slice(6, 8);
  return toString;
};

export const deleteHypenFromDate = (date: string) => {
  return date.replaceAll("-", "");
};

export const setQueryStringParameter = (name: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};

export const deleteQueryStringParameter = (name: string) => {
  const params = new URLSearchParams(window.location.search);
  params.delete(name);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );
};

class ExtractHourAndMin {
  time = "";
  hourIdx = 0;
  minIdx = 0;
  constructor(time: string) {
    this.time = time;
    this.hourIdx = time.indexOf("시");
    this.minIdx = time.indexOf("분");
  }
  getHour() {
    return Number(this.time.slice(0, this.hourIdx));
  }
  getMin() {
    return Number(this.time.slice(this.hourIdx + 1, this.minIdx));
  }
}

export const getBroadcasting = (
  todayFormat: string,
  start_time: string,
  end_time: string
) => {
  let todayJs = dayjs().format("YYYY-MM-DD");
  if (start_time === null || start_time === "" || start_time === undefined)
    return true;
  if (end_time === null || end_time === "" || end_time === undefined)
    return true;
  let nowTime = new ExtractHourAndMin(dayjs().format("H시m분"));
  let nowHour = nowTime.getHour();
  let nowMin = nowTime.getMin();

  let startTime = new ExtractHourAndMin(start_time);
  let startHour = startTime.getHour();
  let startMin = startTime.getMin();

  let endTime = new ExtractHourAndMin(end_time);

  let endHour = endTime.getHour();
  let endMin = endTime.getMin();

  if (todayFormat === todayJs) {
    if (startHour === nowHour) {
      if (startMin <= nowMin) {
        return true;
      }
    }

    if (endHour === nowHour) {
      if (nowMin <= endMin) {
        return true;
      }
    }
  }
  return false;
};
