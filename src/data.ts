import { CalendarEvent, EventType } from './types';

const SHEET_ID = '1184qmC-7mpZtpg15R--il4K3tVxSTAcJUZxpWf9KFAs';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

if (!API_KEY) {
  console.error('Google Sheets API key is missing. Please set VITE_GOOGLE_SHEETS_API_KEY in your .env file');
}

export async function getEvents(): Promise<CalendarEvent[]> {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Página2?key=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch data from Google Sheets: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length < 2) {
      return [];
    }

    // Transform sheet data to match Event interface
    return rows.slice(1).map((row: string[], index: number): CalendarEvent => ({
      id: `event-${index + 1}`,
      title: row[0] || '',
      date: row[1] || '',
      time: row[2] || '',
      location: row[3] || '',
      type: row[4]?.toLowerCase() as EventType || 'music',
      url: row[5] || '',
      image: row[6] || ''
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}
