export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  class: 'ECONOMY' | 'BUSINESS' | 'FIRST';
}

export interface PassengerDetails {
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  mobile: string;
  email: string;
  address: string;
  idType: 'Passport' | 'Aadhar' | 'PAN' | 'VoterID';
  idNumber: string;
  gstNumber?: string;
  gstName?: string;
}

export interface Booking {
  bookingId: string;
  flight: Flight;
  passenger: PassengerDetails;
  bookingDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  totalAmount: number;
}
