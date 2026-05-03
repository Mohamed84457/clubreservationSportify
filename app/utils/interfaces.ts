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
  status: string;
  playerName: string;
}

// the response from the backend for the resevations of specific day

export interface ApiResponse {
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
export interface ItotalBookings {
  numberofbookings: number;
  istrendup: boolean;
  trendpersent: number;
}
//  monthly spend
export interface Imonthlyspend {
  monthlyspend: number;
  istrendup: boolean;
  trendpersent: number;
}
//   cancellations
export interface Icancellations {
  numbercancellations: number;
  numbercancellationslastmonth: number;
}

// spesific reservation details
export interface Ireservationdetails {
  reservationId: string;
  startTime: string;
  endTime: string;
  status: string;
  userId: string;
  userFullName: string;
  userEmail: string;
  userPhoneNumber: string;
  maintenanceNote: string;
}

// user interface
export interface Iuser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}
