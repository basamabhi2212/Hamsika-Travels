import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users, Briefcase } from 'lucide-react';
import { SearchParams } from '../types';

export const Home = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<SearchParams>({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'ECONOMY'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.from || !params.to || !params.departDate) {
      alert("Please fill in all required fields");
      return;
    }
    navigate('/search', { state: params });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Airplane wing"
        />
        <div className="absolute inset-0 bg-brand-900/40"></div>
        
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
              Explore the World with Hamsika Travels
            </h1>
            
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* From */}
                <div className="md:col-span-3 relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">From</label>
                  <input
                    type="text"
                    placeholder="DEL (Delhi)"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none font-semibold text-gray-800"
                    value={params.from}
                    onChange={(e) => setParams({...params, from: e.target.value.toUpperCase()})}
                    required
                  />
                  <div className="absolute right-3 top-9 text-gray-400 text-xs">IATA</div>
                </div>

                {/* To */}
                <div className="md:col-span-3 relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">To</label>
                  <input
                    type="text"
                    placeholder="BOM (Mumbai)"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none font-semibold text-gray-800"
                    value={params.to}
                    onChange={(e) => setParams({...params, to: e.target.value.toUpperCase()})}
                    required
                  />
                  <div className="absolute right-3 top-9 text-gray-400 text-xs">IATA</div>
                </div>

                {/* Dates */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Departure</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-gray-800"
                    value={params.departDate}
                    onChange={(e) => setParams({...params, departDate: e.target.value})}
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Return (Optional)</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-gray-800"
                    value={params.returnDate}
                    onChange={(e) => setParams({...params, returnDate: e.target.value})}
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex items-end">
                  <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 h-[50px]">
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>

                {/* Secondary Filters Row */}
                <div className="md:col-span-12 flex gap-4 mt-4 border-t pt-4 border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Users className="w-4 h-4 text-gray-500" />
                    <select 
                      className="bg-transparent text-sm font-medium text-gray-700 outline-none"
                      value={params.passengers}
                      onChange={(e) => setParams({...params, passengers: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Passenger{n>1?'s':''}</option>)}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    <select 
                      className="bg-transparent text-sm font-medium text-gray-700 outline-none"
                      value={params.class}
                      onChange={(e) => setParams({...params, class: e.target.value as any})}
                    >
                      <option value="ECONOMY">Economy</option>
                      <option value="BUSINESS">Business</option>
                      <option value="FIRST">First Class</option>
                    </select>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
             <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop" alt="Delhi" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Delhi</h3>
                  <p className="text-gray-200 text-sm">Capital of India</p>
                </div>
             </div>
           </div>
           <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
             <img src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2135&auto=format&fit=crop" alt="Mumbai" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Mumbai</h3>
                  <p className="text-gray-200 text-sm">City of Dreams</p>
                </div>
             </div>
           </div>
           <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-lg">
             <img src="https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop" alt="Dubai" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Dubai</h3>
                  <p className="text-gray-200 text-sm">Luxury & Adventure</p>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
