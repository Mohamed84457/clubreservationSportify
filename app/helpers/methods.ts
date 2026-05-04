import { Ireservation } from "../utils/interfaces";

// convert time string to munutes to facilate comparision and calculation
export function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
// convert minutes to string time
export function minutesToTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// convert minutes to am/pm format
export const minutesToAmPm = (minutes: number) => {
  let hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${hours}:${mins.toString().padStart(2, "0")} ${period}`;
};

// generate time slots between two times with given duration
export function generateSlots(start: string, end: string, duration: number) {
  const slots: string[] = [];

  let startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);

  while (startMin < endMin) {
    const h = Math.floor(startMin / 60);
    const m = startMin % 60;

    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

    startMin += duration;
  }

  return slots;
}

//is the slot booked or not
export function isSlotBooked(
  slot: string,
  reservations: Ireservation[],
  duration: number,
) {
  const slotStart = timeToMinutes(slot);
  const slotEnd = slotStart + duration;

  return reservations.some((res) => {
    const resStart = timeToMinutes(getTimeFromTimestamp(res.startTime));
    const resEnd = timeToMinutes(getTimeFromTimestamp(res.endTime));

    return slotStart < resEnd && slotEnd > resStart;
  });
}

// extract date from timestamp
export function getDateFromTimestamp(
  timestamp: string | undefined,
): string | null {
  if (!timestamp) return null;

  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// extravt time from timestamp
export function getTimeFromTimestamp(timestamp: string | undefined): string {
  if (!timestamp) return "";
  const timePart = timestamp.split("T")[1];
  return timePart.slice(0, 5); // HH:mm
}

// extract date from date reservation

//convert 4:30 AM  & date:Tue May 05 2026 00:00:00 GMT+0300
//to like this 2026-05-06T17:00:00   timestamp
export function combineDateAndTimeFromMinutes(
  date: Date | null,
  minutes: number | null
): string | null {
  if (!date || minutes === null) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T${String(hours).padStart(2, "0")}:${String(
    mins
  ).padStart(2, "0")}:00`;
}
// compare if two date same
export const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();
