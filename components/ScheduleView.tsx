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

import { useState } from 'react';
import type { CalendarView } from '@/types';

// TODO: Import your components
// import { DoctorSelector } from './DoctorSelector';
// import { DayView } from './DayView';
// import { WeekView } from './WeekView';

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
  // TODO: Use the useAppointments hook to fetch data
  // const { appointments, doctor, loading, error } = useAppointments({
  //   doctorId: selectedDoctorId,
  //   date: selectedDate,
  // });

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* TODO: Implement the component structure */}

      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
            <p className="text-sm text-gray-600 mt-1">
              TODO: Display doctor name and specialty
            </p>
          </div>

          <div className="flex gap-4">
            {/* TODO: Add DoctorSelector component */}
            <div className="text-sm text-gray-500">Doctor Selector</div>

            {/* TODO: Add date picker */}
            <div className="text-sm text-gray-500">Date Picker</div>

            {/* TODO: Add view toggle buttons (Day/Week) */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded"
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
        {/* TODO: Conditionally render DayView or WeekView based on view prop */}
        <div className="text-center text-gray-500 py-12">
          <p>Calendar View Goes Here</p>
          <p className="text-sm mt-2">
            Implement DayView and WeekView components and render based on selected view
          </p>
        </div>

        {/* TODO: Uncomment when components are ready */}
        {/* {view === 'day' ? (
          <DayView
            appointments={appointments}
            doctor={doctor}
            date={selectedDate}
          />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={getWeekStart(selectedDate)}
          />
        )} */}
      </div>
    </div>
  );
}
