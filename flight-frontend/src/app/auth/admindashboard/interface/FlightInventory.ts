import { Airline } from "./Airline";
export interface FlightInventorys {
  id: number;
  flightNumber: string;
  departure: string;
  arrival: string;
  travelDate: string;        // yyyy-MM-dd
  departureTime: string;     // HH:mm:ss
  arrivalTime: string;       // HH:mm:ss
  availableSeats: number;
  ticketPrice: number;
  airline: Airline;
}