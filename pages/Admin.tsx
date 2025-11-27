import React, { useState, useEffect } from 'react';
import { getBookings, deleteBooking } from '../services/api';
import { Booking } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Trash2, Download, LogOut, LayoutDashboard } from 'lucide-react';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      setBookings(getBookings());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Credentials (Try: admin / admin123)");
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      deleteBooking(id);
      setBookings(getBookings());
    }
  };

  const downloadExcel = () => {
    const headers = ['Booking ID', 'Passenger', 'Flight', 'Date', 'Amount', 'Status'];
    const rows = bookings.map(b => [
      b.bookingId,
      b.passenger.fullName,
      b.flight.flightNumber,
      b.bookingDate,
      b.totalAmount,
      b.status
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bookings_hamsika.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </div>
            <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded font-bold hover:bg-brand-700">
              Login
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-4">Demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  // Calculate Chart Data
  const chartData = bookings.reduce((acc: any[], curr) => {
    const date = new Date(curr.bookingDate).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.sales += curr.totalAmount;
    } else {
      acc.push({ date, sales: curr.totalAmount });
    }
    return acc;
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-brand-900 text-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <LayoutDashboard />
           <span className="font-bold text-xl">Admin Panel</span>
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="text-sm bg-brand-800 px-3 py-1 rounded hover:bg-brand-700 flex items-center gap-1">
          <LogOut className="w-4 h-4"/> Logout
        </button>
      </nav>

      <div className="p-6 max-w-7xl mx-auto">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-500 text-sm uppercase font-semibold">Pending Issues</h3>
            <p className="text-3xl font-bold text-orange-500">0</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Overview</h3>
          <div className="h-64">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                No data available yet
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
            <button onClick={downloadExcel} className="flex items-center gap-2 text-sm text-green-700 font-medium hover:text-green-900">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 uppercase text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-6 py-3">Booking ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Passenger</th>
                  <th className="px-6 py-3">Flight</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((booking) => (
                  <tr key={booking.bookingId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-gray-900">{booking.bookingId}</td>
                    <td className="px-6 py-4">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking.passenger.fullName}</div>
                      <div className="text-xs text-gray-400">{booking.passenger.email}</div>
                    </td>
                    <td className="px-6 py-4">{booking.flight.flightNumber} ({booking.flight.departureCity} - {booking.flight.arrivalCity})</td>
                    <td className="px-6 py-4 font-medium">₹{booking.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs font-semibold">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(booking.bookingId)}
                        className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                        title="Delete Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                   <tr>
                     <td colSpan={7} className="text-center py-8 text-gray-400">No bookings found.</td>
                   </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
