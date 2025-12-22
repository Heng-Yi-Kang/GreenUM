import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Plus, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';

const EventsPage = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
  };

  const handleCreateEvent = async (eventData: any) => {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select();

    if (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } else {
      setEvents([...events, ...(data || [])]);
      setIsModalOpen(false);
    }
  };

  const handleUpdateEvent = async (eventData: any) => {
    if (!editingEvent) return;

    const { error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', editingEvent.id);

    if (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    } else {
      setEvents(events.map(ev => ev.id === editingEvent.id ? { ...ev, ...eventData } : ev));
      setIsModalOpen(false);
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    } else {
      setEvents(events.filter(ev => ev.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (id: string) => {
    const eventToEdit = events.find(ev => ev.id === id);
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setIsModalOpen(true);
    }
  };

  const handleModalSubmit = (formData: any) => {
    if (editingEvent) {
      handleUpdateEvent(formData);
    } else {
      handleCreateEvent(formData);
    }
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
              onClick={openAddModal}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/20 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </button>
          )}
        </div>
      </div>

      {/* Stats/Info Cards */}
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
              onEdit={openEditModal}
              onDelete={handleDeleteEvent}
            />
          ))
        )}
      </div>

      {/* Modal only accessible if admin */}
      {isAdmin && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={editingEvent}
        />
      )}
    </div>
  );
};

export default EventsPage;
