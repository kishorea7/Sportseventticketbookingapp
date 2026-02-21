import { Calendar, Clock, MapPin, Ticket, Users, DollarSign } from 'lucide-react';
import { Event } from '../App';

interface EventDetailsProps {
  event: Event;
  onSelect: (event: Event) => void;
  isSelected: boolean;
}

export function EventDetails({ event, onSelect, isSelected }: EventDetailsProps) {
  const isAvailable = event.availableTickets > 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border-2 ${
        isSelected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-transparent'
      }`}
      onClick={() => onSelect(event)}
    >
      <div className="p-6">
        {/* Event Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.eventName}</h3>
        
        {/* Department Badge */}
        <div className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-4">
          {event.department}
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          {/* Date */}
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
            <span className="text-sm">
              {new Date(event.eventDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Time */}
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-3 text-indigo-500" />
            <span className="text-sm">{event.eventTime}</span>
          </div>

          {/* Venue */}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
            <span className="text-sm">{event.venue}</span>
          </div>

          {/* Price */}
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-5 h-5 mr-3 text-indigo-500" />
            <span className="text-sm font-medium">₹{event.ticketPrice} per ticket</span>
          </div>

          {/* Available Tickets */}
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-3 text-indigo-500" />
            <span
              className={`text-sm font-medium ${
                event.availableTickets < 10 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {event.availableTickets} tickets available
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`mt-6 w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${
            isAvailable
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isAvailable}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(event);
          }}
        >
          <Ticket className="w-5 h-5 mr-2" />
          {isAvailable ? 'Book Tickets' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
}
