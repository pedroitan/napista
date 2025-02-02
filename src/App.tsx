import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Search, LayoutGrid, List, Grid } from 'lucide-react';
import { EventCard } from './components/EventCard';
import { FilterButton } from './components/FilterButton';
import { getEvents } from './data';
import { CalendarEvent, EventType, ViewMode } from './types';

function App() {
  const [selectedType, setSelectedType] = useState<EventType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = useMemo(() => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return events.filter((event) => {
      const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
      const typeMatch = selectedType === 'all' || event.type === selectedType;
      const searchMatch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.url.toLowerCase().includes(searchQuery.toLowerCase());
      return eventDate >= currentDate && typeMatch && searchMatch;
    });
  }, [events, searchQuery, selectedType]);

  const types: ('Todos' | EventType)[] = ['Todos', 'Música', 'Teatro', 'Arte', 'Dança', 'Literatura'];

  const viewModes = [
    { id: 'grid' as const, icon: LayoutGrid, label: 'Grid' },
    { id: 'compact' as const, icon: Grid, label: 'Compact' },
    { id: 'list' as const, icon: List, label: 'List' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <MapPin className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Na Pista!</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-8">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Tipo de Evento</h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <FilterButton
                    key={type}
                    label={type}
                    active={selectedType === type}
                    onClick={() => setSelectedType(type)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-1 bg-gray-100 p-0.5 rounded-lg w-fit ml-auto">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === mode.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title={mode.label}
              >
                <mode.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading events...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* Events Grid/List */}
        {!loading && !error && (
          <>
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : viewMode === 'compact'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                  : 'space-y-4'
              }
            >
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} viewMode={viewMode} />
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No events found with the selected filters.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
