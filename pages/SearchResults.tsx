import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flight, SearchParams } from '../types';
import { searchFlights } from '../services/api';
import { Clock, IndianRupee, ArrowRight } from 'lucide-react';

export const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state as SearchParams;
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams) {
      navigate('/');
      return;
    }

    const fetchFlights = async () => {
      setLoading(true);
      const results = await searchFlights(searchParams.from, searchParams.to, searchParams.departDate);
      setFlights(results);
      setLoading(false);
    };

    fetchFlights();
  }, [searchParams, navigate]);

  const handleBook = (flight: Flight) => {
    navigate('/booking', { state: { flight, searchParams } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Searching best flights for you...</h2>
        <p className="text-gray-500">Checking Kiwi API for {searchParams?.from} to {searchParams?.to}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white p-4 rounded-lg shadow mb-6 border-l-4 border-brand-500 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {searchParams.from} <span className="text-gray-400 mx-2">→</span> {searchParams.to}
          </h1>
          <p className="text-gray-600 mt-1">
            {new Date(searchParams.departDate).toLocaleDateString()} • {searchParams.passengers} Passenger(s) • {searchParams.class}
          </p>
        </div>
        <button onClick={() => navigate('/')} className="text-brand-600 hover:text-brand-800 font-medium">
          Modify Search
        </button>
      </div>

      <div className="space-y-4">
        {flights.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No flights found.</h3>
            <button onClick={() => navigate('/')} className="mt-4 text-brand-600 underline">Try different dates</button>
          </div>
        ) : (
          flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 border border-gray-100 overflow-hidden">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Airline Info */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <img src={flight.airlineLogo} alt={flight.airline} className="w-12 h-12 object-contain rounded bg-white" />
                  <div>
                    <h3 className="font-bold text-gray-800">{flight.airline}</h3>
                    <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-center justify-center gap-8 w-full md:w-2/4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">
                      {new Date(flight.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="text-sm font-semibold text-gray-500">{flight.departureCity}</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
                    <div className="w-24 h-[2px] bg-gray-300 relative">
                       <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-gray-300"></div>
                       <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-gray-300"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1 font-medium">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop(s)`}</p>
                  </div>

                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">
                      {new Date(flight.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="text-sm font-semibold text-gray-500">{flight.arrivalCity}</div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="w-full md:w-1/4 flex flex-col items-end border-l border-gray-100 pl-6">
                   <div className="text-2xl font-bold text-brand-700 flex items-center">
                     <IndianRupee className="w-5 h-5" />
                     {flight.price.toLocaleString('en-IN')}
                   </div>
                   <p className="text-xs text-gray-500 mb-3">per adult</p>
                   <button 
                    onClick={() => handleBook(flight)}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-6 rounded-lg transition flex items-center justify-center gap-2"
                   >
                     Book Now <ArrowRight className="w-4 h-4" />
                   </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
