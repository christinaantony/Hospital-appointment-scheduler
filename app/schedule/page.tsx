/**
 * Schedule Page
 *
 * Main page for the appointment scheduler.
 * This is where candidates will implement the calendar views.
 *
 * TODO for candidates:
 * 1. Import and use the ScheduleView component
 * 2. Set up state for selected doctor and date
 * 3. Handle view switching (day/week)
 */

'use client';

import { useState } from 'react';
import { MOCK_DOCTORS } from '@/data/mockData';
import type { CalendarView } from '@/types';

// TODO: Import your components here
// import { ScheduleView } from '@/components/ScheduleView';

export default function SchedulePage() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(MOCK_DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<CalendarView>('day');

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Schedule
          </h1>
          <p className="text-gray-600">
            View and manage doctor appointments
          </p>
        </header>

        {/* TODO: Replace this placeholder with your ScheduleView component */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-4">
              Schedule View Component Goes Here
            </p>
            <p className="text-sm">
              Implement the ScheduleView component to display the calendar
            </p>

            <div className="mt-8 text-left max-w-md mx-auto space-y-2">
              <p className="font-semibold text-gray-700">Current State:</p>
              <p className="text-sm">Doctor: {selectedDoctorId}</p>
              <p className="text-sm">Date: {selectedDate.toLocaleDateString()}</p>
              <p className="text-sm">View: {view}</p>
            </div>
          </div>
        </div>

        {/* TODO: Uncomment and use when ScheduleView is implemented */}
        {/*
        <ScheduleView
          selectedDoctorId={selectedDoctorId}
          selectedDate={selectedDate}
          view={view}
          onDoctorChange={setSelectedDoctorId}
          onDateChange={setSelectedDate}
          onViewChange={setView}
        />
        */}
      </div>
    </main>
  );
}
