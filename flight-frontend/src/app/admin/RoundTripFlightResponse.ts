import { FlightInventory } from "./flightInventory";

export interface RoundTripFlightResponse {
  going: FlightInventory[];
  coming: FlightInventory[];
}
