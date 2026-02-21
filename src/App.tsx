import { useState } from 'react';
import { EventDetails } from './components/EventDetails';
import { BookingForm } from './components/BookingForm';
import { BookingSummary } from './components/BookingSummary';

export interface Event {
  id: number;
  eventName: string;
  department: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  ticketPrice: number;
  availableTickets: number;
}

export interface Booking {
  userName: string;
  email: string;
  userDepartment: string;
  eventId: number;
  eventName: string;
  ticketsBooked: number;
  totalAmount: number;
}

const initialEvents: Event[] = [
  {
    id: 1,
    eventName: 'Inter-Department Cricket Championship',
    department: 'Computer Science',
    eventDate: '2026-03-15',
    eventTime: '10:00 AM',
    venue: 'University Cricket Ground',
    ticketPrice: 150,
    availableTickets: 50,
  },
  {
    id: 2,
    eventName: 'Basketball Tournament Finals',
    department: 'Mechanical Engineering',
    eventDate: '2026-03-20',
    eventTime: '02:00 PM',
    venue: 'Indoor Sports Complex',
    ticketPrice: 100,
    availableTickets: 75,
  },
  {
    id: 3,
    eventName: 'Badminton Singles Championship',
    department: 'Electronics & Communication',
    eventDate: '2026-03-25',
    eventTime: '09:00 AM',
    venue: 'Main Auditorium Court',
    ticketPrice: 80,
    availableTickets: 40,
  },
  {
    id: 4,
    eventName: 'Football League - Quarterfinals',
    department: 'Civil Engineering',
    eventDate: '2026-03-28',
    eventTime: '04:00 PM',
    venue: 'Main Football Stadium',
    ticketPrice: 120,
    availableTickets: 100,
  },
];

function App() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleBookTickets = (booking: Booking) => {
    // Update available tickets
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === booking.eventId
          ? { ...event, availableTickets: event.availableTickets - booking.ticketsBooked }
          : event
      )
    );

    // Update selected event if it's the one being booked
    if (selectedEvent && selectedEvent.id === booking.eventId) {
      setSelectedEvent(prev => 
        prev ? { ...prev, availableTickets: prev.availableTickets - booking.ticketsBooked } : null
      );
    }

    // Store booking and show summary
    setLastBooking(booking);
    setShowSummary(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setShowSummary(false);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Department Sports Event Booking</h1>
          <p className="mt-2 text-gray-600">Book your tickets for upcoming department sports events</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSummary && lastBooking ? (
          <BookingSummary booking={lastBooking} onClose={handleCloseSummary} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Events List */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map(event => (
                  <EventDetails
                    key={event.id}
                    event={event}
                    onSelect={handleSelectEvent}
                    isSelected={selectedEvent?.id === event.id}
                  />
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingForm
                  selectedEvent={selectedEvent}
                  onBookTickets={handleBookTickets}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 Department Sports Events. All tickets are non-refundable.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
