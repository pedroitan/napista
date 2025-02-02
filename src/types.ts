export type EventType = 'music' | 'theater' | 'art' | 'dance' | 'literature';
export type ViewMode = 'grid' | 'compact' | 'list';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: EventType;
  url: string;
  image: string;
}
