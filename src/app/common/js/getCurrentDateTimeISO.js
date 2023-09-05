/**

Function that returns the current time in an ISO format
calculating the time offset as well.

*/

function getCurrentDateTimeISO() {
  const currentDate = new Date();

  // timezoneOffset will return an ISO format time offset (like: '+02:00')
  const timezoneOffset = currentDate.getTimezoneOffset();
  const timezoneOffsetISO =
    (timezoneOffset < 0 ? "+" : "-") +
    ("0" + Math.abs(Math.floor(timezoneOffset / 60))).slice(-2) +
    ":" +
    ("0" + Math.abs(timezoneOffset % 60)).slice(-2);

  // Formatting the ISO date adding minutes and seconds.
  const dateTimeISO =
    currentDate.toISOString().slice(0, -1) + timezoneOffsetISO;

  return dateTimeISO;
}

export default getCurrentDateTimeISO;
