// export interface FlightWrapper {
//   flightNumber: string;
//   departure: string;
//   arrival: string;
//   travelDate: string;      // yyyy-MM-dd
//   departureTime: string;   // HH:mm:ss
//   arrivalTime: string;     // HH:mm:ss
//   availableSeats: number;
//   ticketPrice: number;
//   airline: number;
// }
export interface Airline {
  id: number;
  name?: string;  
}

export interface FlightInventory {
  id: number;                
  flightNumber: string;
  departure: string;
  arrival: string;
  travelDate: string;         
  departureTime: string;      
  arrivalTime: string;        
  availableSeats: number;
  ticketPrice: number;
  airline: Airline;           
}
