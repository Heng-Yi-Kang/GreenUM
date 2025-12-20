import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import AddEventModal from '../components/AddEventModal';

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const { isAdmin } = useAuth(); // Use Auth Context

  // Fetch events from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const handleAddEvent = (newEvent: any) => {
    // Optimistic update or refetch
    fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
      .then(res => res.json())
      .then(savedEvent => {
        setEvents([...events, savedEvent]);
      })
      .catch(err => console.error('Error adding event:', err));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and participate in sustainable activities</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:shadow-sm transition-all">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          
          {/* Only show Add Event if admin */}
          {isAdmin && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </button>
          )}
        </div>
      </div>

      {/* Stats/Info Cards - similar to the "Accounts" row in the image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg shadow-green-600/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white">This Month</span>
          </div>
          <div className="text-3xl font-bold mb-1">{events.length}</div>
          <div className="text-green-100 text-sm">Active Events</div>
        </div>

        {/* Placeholder stats */}
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
           <div className="text-sm font-medium text-gray-500 mb-2">Total Participants</div>
           <div className="text-2xl font-bold text-gray-900">1,245</div>
           <div className="text-xs text-green-600 mt-1 flex items-center">
             <span>+12% from last month</span>
           </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
           <div className="text-sm font-medium text-gray-500 mb-2">Impact Score</div>
           <div className="text-2xl font-bold text-gray-900">98.5</div>
           <div className="text-xs text-green-600 mt-1">Excellent</div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
           <div className="col-span-full text-center py-10 text-gray-500">
             No events found. {isAdmin ? 'Add the first one!' : 'Check back later.'}
           </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              {...event}
            />
          ))
        )}
      </div>

      {/* Modal only accessible if admin (extra safety) */}
      {isAdmin && (
        <AddEventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
