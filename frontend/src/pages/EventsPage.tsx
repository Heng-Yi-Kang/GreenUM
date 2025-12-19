import React, { useState } from 'react';
import { Plus, Calendar, Filter } from 'lucide-react';
import EventCard from '../components/EventCard';
import AddEventModal from '../components/AddEventModal';

const EventsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Community Tree Planting',
      date: '2024-03-15',
      time: '09:00',
      location: 'Riverside Park',
      description: 'Join us for a day of planting native trees to restore the local ecosystem. Gloves and tools provided.',
    },
    {
      id: 2,
      title: 'Sustainability Workshop',
      date: '2024-03-20',
      time: '14:00',
      location: 'Community Center',
      description: 'Learn practical tips for sustainable living, from composting to reducing plastic waste.',
    },
    {
      id: 3,
      title: 'Beach Cleanup Drive',
      date: '2024-03-22',
      time: '08:00',
      location: 'North Beach',
      description: 'Help us keep our ocean clean! We will be collecting trash along the coastline. Refreshments provided.',
    },
    {
      id: 4,
      title: 'Green Energy Fair',
      date: '2024-04-05',
      time: '10:00',
      location: 'City Square',
      description: 'Explore renewable energy solutions for your home and meet local providers.',
    }
  ]);

  const handleAddEvent = (newEvent: any) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
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
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </button>
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
        {events.map((event) => (
          <EventCard
            key={event.id}
            {...event}
          />
        ))}
      </div>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddEvent}
      />
    </div>
  );
};

export default EventsPage;
