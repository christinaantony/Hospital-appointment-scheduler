/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 *
 * TODO for candidates:
 * 1. Generate time slots (8 AM - 6 PM, 30-minute intervals)
 * 2. Position appointments in their correct time slots
 * 3. Handle appointments that span multiple slots
 * 4. Display appointment details (patient, type, duration)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments gracefully
 */

'use client';

import type { Appointment, Doctor, TimeSlot } from '@/types';

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

/**
 * DayView Component
 *
 * Renders a daily timeline view with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Create a helper function to generate time slots
 * 2. Create a TimeSlotRow component for each time slot
 * 3. Create an AppointmentCard component for each appointment
 * 4. Calculate appointment positioning based on start/end times
 *
 * Consider:
 * - How to handle appointments that span multiple 30-min slots?
 * - How to show overlapping appointments?
 * - How to make the timeline scrollable if needed?
 * - How to highlight the current time?
 */
export function DayView({ appointments, doctor, date }: DayViewProps) {
  /**
   * TODO: Generate time slots
   *
   * Create an array of TimeSlot objects from 8 AM to 6 PM
   * with 30-minute intervals
   *
   * Hint: You can use a loop or date-fns utilities
   */
  function generateTimeSlots(): TimeSlot[] {
    // TODO: Implement time slot generation
    // Example structure:
    // return [
    //   { start: new Date(...8:00), end: new Date(...8:30), label: '8:00 AM' },
    //   { start: new Date(...8:30), end: new Date(...9:00), label: '8:30 AM' },
    //   ...
    // ];
    return [];
  }

  /**
   * TODO: Find appointments for a specific time slot
   *
   * Given a time slot, find all appointments that overlap with it
   */
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    // TODO: Implement appointment filtering
    // Check if appointment.startTime or appointment.endTime falls within the slot
    return [];
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="day-view">
      {/* Day header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* TODO: Format date nicely (e.g., "Monday, October 15, 2024") */}
          {date.toDateString()}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* TODO: Implement the timeline */}
        <div className="text-center text-gray-500 py-12">
          <p>Day View Timeline Goes Here</p>
          <p className="text-sm mt-2">
            Implement time slots (8 AM - 6 PM) and position appointments
          </p>

          {/* Placeholder to show appointments exist */}
          {appointments.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium">
                {appointments.length} appointment(s) for this day
              </p>
            </div>
          )}
        </div>

        {/* TODO: Replace above with actual timeline implementation */}
        {/* Example structure:
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex">
              <div className="w-24 p-2 text-sm text-gray-600">
                {slot.label}
              </div>
              <div className="flex-1 p-2 min-h-[60px] relative">
                {getAppointmentsForSlot(slot).map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          ))}
        </div>
        */}
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}

/**
 * TODO: Create an AppointmentCard component
 *
 * This should be a small, reusable component that displays
 * a single appointment with appropriate styling.
 *
 * Consider:
 * - Show patient name
 * - Show appointment type
 * - Show duration
 * - Color-code by appointment type (use APPOINTMENT_TYPE_CONFIG from types)
 * - Make it visually clear when appointments span multiple slots
 */
