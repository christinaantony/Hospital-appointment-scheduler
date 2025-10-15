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

import { useMemo } from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { APPOINTMENT_TYPE_CONFIG, DEFAULT_CALENDAR_CONFIG } from '@/types';
import { format, isBefore, isAfter } from 'date-fns';
import { getPatientById } from '@/data/mockData';

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
  // Generate time slots based on DEFAULT_CALENDAR_CONFIG
  const timeSlots = useMemo<TimeSlot[]>(() => {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + slotDuration);
        slots.push({ start, end, label: format(start, 'HH:mm') });
      }
    }
    return slots;
  }, [date]);

  // Helper to get overlapping appointments for a slot
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      // Overlap if aptStart < slot.end && aptEnd > slot.start
      return isBefore(aptStart, slot.end) && isAfter(aptEnd, slot.start);
    });
  }

  return (
    <div className="day-view">
      {/* Day header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(date, 'EEEE, MMMM d, yyyy')}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex">
              <div className="w-20 md:w-24 p-2 text-xs md:text-sm text-gray-600 bg-gray-50">
                {format(slot.start, 'h:mm a')}
              </div>
              <div className="flex-1 p-2 min-h-[52px] relative">
                <div className="flex gap-2 flex-wrap">
                  {getAppointmentsForSlot(slot).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
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
function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const typeInfo = APPOINTMENT_TYPE_CONFIG[appointment.type];
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);
  const durationMins = Math.max(15, Math.round((end.getTime() - start.getTime()) / 60000));
  const patient = getPatientById(appointment.patientId);

  return (
    <div
      className="rounded-md px-3 py-2 text-xs md:text-sm text-white shadow-sm"
      style={{ backgroundColor: typeInfo.color, minWidth: 160 }}
      title={`${patient?.name ?? 'Patient'} • ${typeInfo.label} • ${durationMins} min`}
    >
      <div className="font-semibold truncate">{patient?.name ?? 'Patient'}</div>
      <div className="opacity-90 truncate">{typeInfo.label}</div>
      <div className="opacity-90 text-[11px]">{format(start, 'h:mm a')} • {durationMins} min</div>
    </div>
  );
}
