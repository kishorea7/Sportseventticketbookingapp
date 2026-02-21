import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Ticket } from 'lucide-react';
import { Event, Booking } from '../App';

interface BookingFormProps {
  selectedEvent: Event | null;
  onBookTickets: (booking: Booking) => void;
}

interface FormData {
  userName: string;
  email: string;
  userDepartment: string;
  numberOfTickets: string;
}

interface FormErrors {
  userName?: string;
  email?: string;
  userDepartment?: string;
  numberOfTickets?: string;
}

const departments = [
  'Computer Science',
  'Mechanical Engineering',
  'Electronics & Communication',
  'Civil Engineering',
  'Electrical Engineering',
  'Information Technology',
  'Chemical Engineering',
  'Biotechnology',
];

export function BookingForm({ selectedEvent, onBookTickets }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    userDepartment: '',
    numberOfTickets: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Reset form when event changes
  useEffect(() => {
    setSuccessMessage('');
  }, [selectedEvent]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate userName
    if (!formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate department
    if (!formData.userDepartment) {
      newErrors.userDepartment = 'Department is required';
    }

    // Validate number of tickets
    if (!formData.numberOfTickets) {
      newErrors.numberOfTickets = 'Number of tickets is required';
    } else {
      const ticketCount = parseInt(formData.numberOfTickets);
      if (isNaN(ticketCount) || ticketCount <= 0) {
        newErrors.numberOfTickets = 'Please enter a positive number';
      } else if (selectedEvent && ticketCount > selectedEvent.availableTickets) {
        newErrors.numberOfTickets = `Only ${selectedEvent.availableTickets} tickets available`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSuccessMessage('');
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate individual field on blur
    const newErrors: FormErrors = { ...errors };
    
    if (field === 'userName' && !formData.userName.trim()) {
      newErrors.userName = 'Name is required';
    }
    
    if (field === 'email') {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    if (field === 'userDepartment' && !formData.userDepartment) {
      newErrors.userDepartment = 'Department is required';
    }
    
    if (field === 'numberOfTickets') {
      if (!formData.numberOfTickets) {
        newErrors.numberOfTickets = 'Number of tickets is required';
      } else {
        const ticketCount = parseInt(formData.numberOfTickets);
        if (isNaN(ticketCount) || ticketCount <= 0) {
          newErrors.numberOfTickets = 'Please enter a positive number';
        } else if (selectedEvent && ticketCount > selectedEvent.availableTickets) {
          newErrors.numberOfTickets = `Only ${selectedEvent.availableTickets} tickets available`;
        }
      }
    }
    
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      userName: true,
      email: true,
      userDepartment: true,
      numberOfTickets: true,
    });

    if (!selectedEvent) {
      return;
    }

    if (validateForm()) {
      const ticketCount = parseInt(formData.numberOfTickets);
      const booking: Booking = {
        userName: formData.userName,
        email: formData.email,
        userDepartment: formData.userDepartment,
        eventId: selectedEvent.id,
        eventName: selectedEvent.eventName,
        ticketsBooked: ticketCount,
        totalAmount: ticketCount * selectedEvent.ticketPrice,
      };

      onBookTickets(booking);
      
      // Reset form
      setFormData({
        userName: '',
        email: '',
        userDepartment: '',
        numberOfTickets: '',
      });
      setTouched({});
      setErrors({});
    }
  };

  const handleReset = () => {
    setFormData({
      userName: '',
      email: '',
      userDepartment: '',
      numberOfTickets: '',
    });
    setErrors({});
    setTouched({});
    setSuccessMessage('');
  };

  const totalAmount = selectedEvent && formData.numberOfTickets
    ? parseInt(formData.numberOfTickets) * selectedEvent.ticketPrice
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Ticket className="w-6 h-6 mr-2 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Book Tickets</h2>
      </div>

      {!selectedEvent ? (
        <div className="text-center py-8 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Please select an event to book tickets</p>
        </div>
      ) : (
        <>
          {/* Selected Event Info */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <p className="font-medium text-gray-800 mb-1">{selectedEvent.eventName}</p>
            <p className="text-sm text-gray-600">{selectedEvent.department}</p>
            <p className="text-sm text-gray-600 mt-2">
              Price: ₹{selectedEvent.ticketPrice} per ticket
            </p>
            <p className="text-sm text-gray-600">
              Available: {selectedEvent.availableTickets} tickets
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                onBlur={() => handleBlur('userName')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                  touched.userName && errors.userName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {touched.userName && errors.userName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.userName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label htmlFor="userDepartment" className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="userDepartment"
                value={formData.userDepartment}
                onChange={(e) => handleInputChange('userDepartment', e.target.value)}
                onBlur={() => handleBlur('userDepartment')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                  touched.userDepartment && errors.userDepartment ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {touched.userDepartment && errors.userDepartment && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.userDepartment}
                </p>
              )}
            </div>

            {/* Number of Tickets */}
            <div>
              <label htmlFor="numberOfTickets" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Tickets <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="numberOfTickets"
                min="1"
                max={selectedEvent.availableTickets}
                value={formData.numberOfTickets}
                onChange={(e) => handleInputChange('numberOfTickets', e.target.value)}
                onBlur={() => handleBlur('numberOfTickets')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
                  touched.numberOfTickets && errors.numberOfTickets ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter number of tickets"
              />
              {touched.numberOfTickets && errors.numberOfTickets && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.numberOfTickets}
                </p>
              )}
            </div>

            {/* Total Amount Display */}
            {totalAmount > 0 && !errors.numberOfTickets && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-indigo-600">₹{totalAmount}</span>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 focus:ring-4 focus:ring-indigo-300"
              >
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
