/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component should compose smaller components together.
 *
 * TODO for candidates:
 * 1. Create the component structure (header, controls, calendar)
 * 2. Compose DoctorSelector, DayView, WeekView together
 * 3. Handle view switching (day vs week)
 * 4. Manage state or use the useAppointments hook
 * 5. Think about component composition and reusability
 */

'use client';

import { useMemo } from 'react';
import type { CalendarView } from '@/types';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { useAppointments } from '@/hooks/useAppointments';
import { format, startOfWeek, addDays } from 'date-fns';

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

/**
 * ScheduleView Component
 *
 * This is the main container component for the schedule interface.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - How to structure the layout (header, controls, calendar)
 * - How to compose smaller components
 * - How to pass data down to child components
 * - How to handle user interactions (view switching, date changes)
 */
export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  const weekStart = useMemo(() => startOfWeek(selectedDate, { weekStartsOn: 1 }), [selectedDate]);

  const { appointments, doctor, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
    startDate: view === 'week' ? weekStart : undefined,
    endDate: view === 'week' ? addDays(weekStart, 6) : undefined,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {doctor ? `${doctor.name} — ${doctor.specialty}` : 'Doctor Schedule'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {view === 'day' ? format(selectedDate, 'EEEE, MMM d, yyyy') : `${format(weekStart, 'MMM d')} - ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={onDoctorChange} />

            {/* Date Picker */}
            <input
              type="date"
              value={format(selectedDate, 'yyyy-MM-dd')}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* View toggle */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm rounded ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="p-6">
        {loading && (
          <div className="text-center text-gray-500 py-12">Loading schedule…</div>
        )}
        {error && (
          <div className="text-center text-red-600 py-6">Failed to load appointments.</div>
        )}
        {!loading && !error && (
          <>
            {view === 'day' ? (
              <DayView appointments={appointments} doctor={doctor} date={selectedDate} />
            ) : (
              <WeekView appointments={appointments} doctor={doctor} weekStartDate={weekStart} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
