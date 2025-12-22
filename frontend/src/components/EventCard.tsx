import React from 'react';
import { Calendar, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EventCardProps {
  id: string; // Add ID for identification
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, date, time, location, description, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 pr-6">{title}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 shrink-0">
          Upcoming
        </span>
      </div>
      
      <p className="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
        {description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-green-600" />
          <span>{date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-green-600" />
          <span>{time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-green-600" />
          <span className="truncate">{location}</span>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
        <button className="flex-1 py-2 px-4 bg-white border border-green-500 text-green-600 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
          View Details
        </button>
        
        {isAdmin && (
          <>
            <button 
              onClick={() => onEdit && onEdit(id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
              title="Edit Event"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete && onDelete(id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              title="Delete Event"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
