import { Ireservation } from "../utils/interfaces"

// convert time string to munutes to facilate comparision and calculation 
export function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number)
  return h * 60 + m
}
// convert minutes to string time 
export function minutesToTime(minutes:number){
   const h = Math.floor(minutes / 60)
    const m = minutes % 60

      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    
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
  const slots: string[] = []

  let startMin = timeToMinutes(start)
  const endMin = timeToMinutes(end)

  while (startMin < endMin) {
    const h = Math.floor(startMin / 60)
    const m = startMin % 60

    slots.push(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
    )

    startMin += duration
  }

  return slots
}



//is the slot booked or not 
export function isSlotBooked(slot: string, reservations: Ireservation[], duration: number) {
  const slotStart = timeToMinutes(slot)
  const slotEnd = slotStart + duration

  return reservations.some(res => {
    const resStart = timeToMinutes(res.startTime)
    const resEnd = timeToMinutes(res.endTime)

    return slotStart < resEnd && slotEnd > resStart
  })
}


// extract date from timestamp
export function getDateFromTimestamp(timestamp: string): string {
  return timestamp.split("T")[0];
}


// extravt time from timestamp
export function getTimeFromTimestamp(timestamp: string): string {
  const timePart = timestamp.split("T")[1];
  return timePart.slice(0, 5); // HH:mm
}