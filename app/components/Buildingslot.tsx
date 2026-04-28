// helpers
import { generateSlots, isSlotBooked } from "../helpers/methods";
import { Eslotstate } from "../utils/enums";
// interfaces
import { ApiResponse, Islot } from "../utils/interfaces";

export function buildSlots(data: ApiResponse): Islot[] {
  const { openingHours, slotDuration, reservations } = data;

  const times = generateSlots(
    openingHours.start,
    openingHours.end,
    slotDuration,
  );

  return times.map((time, index) => {
    const reservation = reservations.find((res) =>
      isSlotBooked(time, [res], slotDuration)
    );

    let state: Eslotstate = Eslotstate.available;

    if (reservation) {
      if (reservation.state.toLowerCase() === "maintained") {
        state = Eslotstate.maintained;
      } else if (reservation.state.toLowerCase() === "booked") {
        state = Eslotstate.booked;
      }
    }

    return {
      id: index,
      time,
      available: !reservation,
      state,
    };
  });
}