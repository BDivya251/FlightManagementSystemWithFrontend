export interface FlightWrapper {
  flightNumber: string;
  departure: string;
  arrival: string;
  travelDate: string;      // yyyy-MM-dd
  departureTime: string;   // HH:mm:ss
  arrivalTime: string;     // HH:mm:ss
  availableSeats: number;
  ticketPrice: number;
  airline: number;
}