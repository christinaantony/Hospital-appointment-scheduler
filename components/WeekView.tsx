/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 *
 * TODO for candidates:
 * 1. Generate a 7-day grid (Monday through Sunday)
 * 2. Generate time slots for each day
 * 3. Position appointments in the correct day and time
 * 4. Make it responsive (may need horizontal scroll on mobile)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments
 */

'use client';

import { useMemo } from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { APPOINTMENT_TYPE_CONFIG, DEFAULT_CALENDAR_CONFIG } from '@/types';
import { addDays, format, isBefore, isAfter, startOfDay } from 'date-fns';
import { getPatientById } from '@/data/mockData';

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Should be a Monday
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Generate an array of 7 dates (Mon-Sun) from weekStartDate
 * 2. Generate time slots (same as DayView: 8 AM - 6 PM)
 * 3. Create a grid: rows = time slots, columns = days
 * 4. Position appointments in the correct cell (day + time)
 *
 * Consider:
 * - How to make the grid scrollable horizontally on mobile?
 * - How to show day names and dates in headers?
 * - How to handle appointments that span multiple hours?
 * - Should you reuse logic from DayView?
 */
export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  const weekDays = useMemo<Date[]>(() => Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i)), [weekStartDate]);

  const timeSlots = useMemo<TimeSlot[]>(() => {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        const start = new Date(weekStartDate);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + slotDuration);
        slots.push({ start, end, label: format(start, 'HH:mm') });
      }
    }
    return slots;
  }, [weekStartDate]);

  function isSameCalendarDay(a: Date, b: Date) {
    return startOfDay(a).getTime() === startOfDay(b).getTime();
  }

  function getAppointmentsForDay(date: Date): Appointment[] {
    return appointments.filter((apt) => isSameCalendarDay(new Date(apt.startTime), date));
  }

  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
    const slotEnd = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + DEFAULT_CALENDAR_CONFIG.slotDuration);
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      return isSameCalendarDay(aptStart, date) && isBefore(aptStart, slotEnd) && isAfter(aptEnd, slotStart);
    });
  }

  return (
    <div className="week-view">
      {/* Week header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {`${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            {doctor.name} — {doctor.specialty}
          </p>
        )}
      </div>

      {/* Week grid - may need horizontal scroll on mobile */}
      <div className="border border-gray-200 rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-20 md:w-24 p-2 text-xs bg-gray-50 text-left">Time</th>
              {weekDays.map((day, index) => (
                <th key={index} className="p-2 text-xs bg-gray-50 border-l text-left">
                  <div className="font-semibold">{format(day, 'EEE')}</div>
                  <div className="text-gray-600">{format(day, 'MMM d')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-t align-top">
                <td className="p-2 text-xs text-gray-600">{format(slot.start, 'h:mm a')}</td>
                {weekDays.map((day, dayIndex) => (
                  <td key={dayIndex} className="p-1 border-l align-top min-h-[52px]">
                    <div className="flex gap-2 flex-wrap">
                      {getAppointmentsForDayAndSlot(day, slot.start).map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} compact />
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}

/**
 * TODO: Consider reusing the AppointmentCard component from DayView
 *
 * You might want to add a "compact" prop to make it smaller for week view
 */
function AppointmentCard({ appointment, compact }: { appointment: Appointment; compact?: boolean }) {
  const typeInfo = APPOINTMENT_TYPE_CONFIG[appointment.type];
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);
  const durationMins = Math.max(15, Math.round((end.getTime() - start.getTime()) / 60000));
  const patient = getPatientById(appointment.patientId);

  return (
    <div
      className={`rounded-md ${compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-2 text-xs md:text-sm'} text-white shadow-sm`}
      style={{ backgroundColor: typeInfo.color, minWidth: compact ? 120 : 160 }}
      title={`${patient?.name ?? 'Patient'} • ${typeInfo.label} • ${durationMins} min`}
    >
      <div className="font-semibold truncate">{patient?.name ?? 'Patient'}</div>
      {!compact && <div className="opacity-90 truncate">{typeInfo.label}</div>}
      <div className="opacity-90 text-[11px]">{format(start, 'h:mm a')} • {durationMins} min</div>
    </div>
  );
}
