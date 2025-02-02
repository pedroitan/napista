import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { CalendarEvent, ViewMode } from '../types';

interface EventCardProps {
  event: CalendarEvent;
  viewMode: ViewMode;
}

export const EventCard: React.FC<EventCardProps> = ({ event, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-48 h-48 sm:h-auto relative">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
              <div className="mt-auto space-y-2">
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCompact = viewMode === 'compact';

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
      isCompact ? 'h-[360px]' : ''
    }`}>
      <div className={`relative ${isCompact ? 'h-40' : 'h-48'} overflow-hidden`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`p-${isCompact ? '4' : '6'}`}>
        <h3 className={`${isCompact ? 'text-lg' : 'text-xl'} font-semibold mb-4`}>{event.title}</h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
