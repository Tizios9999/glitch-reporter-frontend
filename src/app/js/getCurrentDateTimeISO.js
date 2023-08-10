function getCurrentDateTimeISO() {
  const currentDate = new Date();

  // Ottieni il fuso orario locale in formato ISO (es. '+02:00')
  const timezoneOffset = currentDate.getTimezoneOffset();
  const timezoneOffsetISO =
    (timezoneOffset < 0 ? "+" : "-") +
    ("0" + Math.abs(Math.floor(timezoneOffset / 60))).slice(-2) +
    ":" +
    ("0" + Math.abs(timezoneOffset % 60)).slice(-2);

  // Formatta la data in formato ISO con inclusi ore e minuti
  const dateTimeISO =
    currentDate.toISOString().slice(0, -1) + timezoneOffsetISO;

  return dateTimeISO;
}

export default getCurrentDateTimeISO;
