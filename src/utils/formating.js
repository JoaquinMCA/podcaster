export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return formattedDate;
}

export function formatTime(timeInMillis) {
  const duration = new Date(timeInMillis);
  const minutes = duration.getUTCMinutes().toString().padStart(2, "0");
  const seconds = duration.getUTCSeconds().toString().padStart(2, "0");
  const formattedDuration = `${minutes}:${seconds}`;
  return formattedDuration;
}
