import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flight, SearchParams, PassengerDetails, Booking as BookingType } from '../types';
import { saveBooking } from '../services/api';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';

export const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchParams } = location.state as { flight: Flight, searchParams: SearchParams } || {};

  const [passenger, setPassenger] = useState<PassengerDetails>({
    fullName: '',
    dob: '',
    gender: 'Male',
    mobile: '',
    email: '',
    address: '',
    idType: 'Aadhar',
    idNumber: ''
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!flight) {
    navigate('/');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the Terms & Conditions");
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay/Stripe Processing delay
    setTimeout(() => {
      const newBooking: BookingType = {
        bookingId: 'HT-' + Math.floor(Math.random() * 1000000),
        flight,
        passenger,
        bookingDate: new Date().toISOString(),
        status: 'Confirmed',
        totalAmount: flight.price * (searchParams?.passengers || 1)
      };

      saveBooking(newBooking);
      setIsProcessing(false);
      navigate('/confirmation', { state: { booking: newBooking } });
    }, 2000);
  };

  const totalAmount = flight.price * (searchParams?.passengers || 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Complete Your Booking</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Passenger Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              Passenger Details
              <span className="text-xs font-normal text-gray-500 ml-2">(As per Govt ID)</span>
            </h2>
            
            <form id="booking-form" onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required name="fullName" type="text" className="w-full p-2 border rounded focus:ring-brand-500 focus:border-brand-500" onChange={handleInputChange} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input required name="dob" type="date" className="w-full p-2 border rounded" onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input required name="mobile" type="tel" placeholder="+91" className="w-full p-2 border rounded" onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input required name="email" type="email" className="w-full p-2 border rounded" onChange={handleInputChange} />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input required name="address" type="text" className="w-full p-2 border rounded" onChange={handleInputChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Govt ID Type</label>
                <select name="idType" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="Aadhar">Aadhar Card</option>
                  <option value="Passport">Passport</option>
                  <option value="PAN">PAN Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input required name="idNumber" type="text" className="w-full p-2 border rounded" onChange={handleInputChange} />
              </div>
            </form>
          </div>

          {/* Payment Section (Mock) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-600" />
              Payment Gateway
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-center gap-3">
              <Lock className="w-5 h-5 text-brand-600" />
              <p className="text-sm text-brand-800">Transactions are secured by 256-bit encryption (Mock)</p>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <input 
                type="checkbox" 
                id="terms" 
                className="w-4 h-4 text-brand-600 rounded" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">I accept the <a href="#" className="text-brand-600 underline">Terms & Conditions</a> and Privacy Policy.</label>
            </div>

            <button 
              form="booking-form"
              type="submit" 
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg shadow-lg transition
                ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
              `}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${totalAmount.toLocaleString('en-IN')}`}
            </button>
          </div>

        </div>

        {/* Right: Flight Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24 border-t-4 border-brand-500">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Flight Summary</h3>
            <div className="flex items-center gap-3 mb-4">
              <img src={flight.airlineLogo} alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-bold">{flight.airline}</div>
                <div className="text-xs text-gray-500">{flight.flightNumber}</div>
              </div>
            </div>

            <div className="relative pl-4 border-l-2 border-dashed border-gray-300 space-y-6 my-6">
              <div>
                 <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-gray-400"></div>
                 <p className="text-sm font-bold text-gray-800">{new Date(flight.departureTime).toLocaleString()}</p>
                 <p className="text-sm text-gray-500">{flight.departureCity}</p>
              </div>
              <div>
                 <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-brand-500"></div>
                 <p className="text-sm font-bold text-gray-800">{new Date(flight.arrivalTime).toLocaleString()}</p>
                 <p className="text-sm text-gray-500">{flight.arrivalCity}</p>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Base Fare x {searchParams?.passengers}</span>
                <span className="font-medium">₹{(flight.price * (searchParams?.passengers || 1)).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm mb-4">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium">₹0 (Included)</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-brand-700 pt-2 border-t">
                <span>Total</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
