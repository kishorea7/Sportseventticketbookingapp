import { CheckCircle, Ticket, User, Mail, Building2, Calendar, DollarSign } from 'lucide-react';
import { Booking } from '../App';

interface BookingSummaryProps {
  booking: Booking;
  onClose: () => void;
}

export function BookingSummary({ booking, onClose }: BookingSummaryProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-green-100">Your tickets have been successfully booked</p>
        </div>

        {/* Booking Details */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Ticket className="w-6 h-6 mr-2 text-indigo-600" />
            Booking Summary
          </h3>

          <div className="space-y-4">
            {/* User Name */}
            <div className="flex items-start">
              <User className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{booking.userName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <Mail className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{booking.email}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-start">
              <Building2 className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium text-gray-900">{booking.userDepartment}</p>
              </div>
            </div>

            {/* Event Name */}
            <div className="flex items-start">
              <Calendar className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Event</p>
                <p className="font-medium text-gray-900">{booking.eventName}</p>
              </div>
            </div>

            {/* Tickets Booked */}
            <div className="flex items-start">
              <Ticket className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Number of Tickets</p>
                <p className="font-medium text-gray-900">{booking.ticketsBooked}</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex items-start pt-4 border-t border-gray-200">
              <DollarSign className="w-5 h-5 mr-3 text-indigo-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Total Amount Paid</p>
                <p className="text-2xl font-bold text-indigo-600">₹{booking.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> A confirmation email has been sent to {booking.email} with your ticket details. 
              Please present this confirmation at the venue entrance.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Book More Tickets
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
