import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Booking } from '../types';
import { CheckCircle, Printer, Download, Home } from 'lucide-react';

export const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state as { booking: Booking } || {};

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p>No booking information found.</p>
          <Link to="/" className="text-brand-600 underline mt-4 block">Return Home</Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      
      <div className="text-center mb-10 no-print">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-600 mt-2">Your booking ID is <span className="font-mono font-bold text-gray-900">{booking.bookingId}</span></p>
        <p className="text-sm text-gray-500 mt-1">A confirmation email has been sent to {booking.passenger.email}</p>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 print:shadow-none print:border-none">
        
        {/* Ticket Header */}
        <div className="bg-brand-600 px-8 py-6 flex justify-between items-center text-white print:bg-gray-800">
          <div>
            <h2 className="text-2xl font-bold">Hamsika Travels</h2>
            <p className="text-brand-100 text-sm">Electronic Ticket</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Booking Reference</p>
            <p className="text-xl font-mono font-bold">{booking.bookingId}</p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <img src={booking.flight.airlineLogo} alt="Airline" className="w-16 h-16 object-contain" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{booking.flight.airline}</h3>
                <p className="text-gray-500">{booking.flight.flightNumber} • {booking.flight.duration}</p>
              </div>
            </div>
            <div className="text-right">
               <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Confirmed</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{new Date(booking.flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-600 font-medium">{booking.flight.departureCity}</p>
              <p className="text-xs text-gray-400">{new Date(booking.flight.departureTime).toDateString()}</p>
            </div>
            <div className="flex-1 px-8 flex items-center justify-center flex-col">
              <div className="text-xs text-gray-400 mb-1">{booking.flight.duration}</div>
              <div className="w-full h-[1px] bg-gray-300 relative">
                <div className="absolute -top-1 right-0 text-gray-300">✈</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{new Date(booking.flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              <p className="text-gray-600 font-medium">{booking.flight.arrivalCity}</p>
              <p className="text-xs text-gray-400">{new Date(booking.flight.arrivalTime).toDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Passenger Name</h4>
              <p className="text-lg font-bold text-gray-900">{booking.passenger.fullName}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Total Paid</h4>
              <p className="text-lg font-bold text-gray-900">₹{booking.totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">ID Type / Number</h4>
              <p className="text-gray-800">{booking.passenger.idType} - {booking.passenger.idNumber}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Status</h4>
              <p className="text-green-600 font-medium">Payment Successful</p>
            </div>
          </div>

          <div className="border-t pt-6 text-center">
            <p className="text-xs text-gray-500">
              Please present this ticket along with your government-issued ID at the airport check-in counter.
              Check-in closes 60 minutes before departure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4 no-print">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Printer className="w-4 h-4" /> Print Ticket
        </button>
        <button 
           onClick={() => navigate('/')}
           className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          <Home className="w-4 h-4" /> Go Home
        </button>
      </div>

    </div>
  );
};
