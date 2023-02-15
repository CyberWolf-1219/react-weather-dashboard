export default function numberToTime(number: number) {
  let remaining = number;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  hours = Math.floor(remaining / 360);
  remaining = remaining % 360;
  minutes = Math.floor(remaining / 60);
  remaining = remaining % 60;
  seconds = remaining;

  return `${hours.toString()}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
