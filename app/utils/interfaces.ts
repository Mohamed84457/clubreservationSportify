import { Eslotstate } from "./enums";

// the slot that show in frontend
export interface Islot {
  id: number;
  time: string;
  available: boolean;
  state: Eslotstate;
}
// the reservation that send to backend or reservation response from backend
export interface Ireservation {
  id: string;
  startTime: string;
  endTime: string;
  state: string;
  courtId: number;
  name: string;
  phoneNUmber: string;
}

// the response from the backend for the resevations of specific day

export interface ApiResponse {
  date: string;
  openingHours: {
    start: string;
    end: string;
  };
  slotDuration: number;
  reservations: Ireservation[];
}

// navigation interface
export interface Inavigation {
  label: string;
  directory: string;
}



// total bookings
export interface ItotalBookings{
  numberofbookings:number;
  istrendup:boolean;
  trendpersent:number;
}
//  monthly spend
export interface Imonthlyspend{
  monthlyspend:number;
  istrendup:boolean;
  trendpersent:number;
}
//   cancellations
export interface Icancellations{
  numbercancellations:number;
  numbercancellationslastmonth:number
}