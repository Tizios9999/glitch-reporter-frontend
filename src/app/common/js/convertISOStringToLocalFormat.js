/**

Function that returns a Local Date format from an 
ISO Date format.

*/

function convertISOStringToLocalFormat(isoString) {
  const date = new Date(isoString);
  const timezoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - timezoneOffset);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hours}:${minutes}`;
}

export default convertISOStringToLocalFormat;
