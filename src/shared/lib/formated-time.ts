import { intervalToDuration } from "date-fns";

export function formatTime(seconds: number) {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
  const { hours, minutes, seconds: secs } = duration;
  const formattedMinutes = minutes ? String(minutes).padStart(2, "0") : "00";
  const formattedSeconds = secs ? String(secs).padStart(2, "0") : "00";
  return hours
    ? `${String(hours)?.padStart(2, "0")}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
}
