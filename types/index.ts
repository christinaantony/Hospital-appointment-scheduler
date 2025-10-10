/**
 * Type Definitions for Hospital Appointment Scheduler
 *
 * These types define the core domain models for the scheduling system.
 * All these types are provided - you don't need to modify them.
 */

/**
 * Appointment types/categories
 */
export type AppointmentType = 'checkup' | 'consultation' | 'follow-up' | 'procedure';

/**
 * Medical specialties
 */
export type Specialty =
  | 'cardiology'
  | 'pediatrics'
  | 'general-practice'
  | 'orthopedics'
  | 'dermatology';

/**
 * Days of the week
 */
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * Doctor working hours for a specific day
 */
export interface WorkingHours {
  start: string;  // Format: "HH:MM" (24-hour format, e.g., "09:00")
  end: string;    // Format: "HH:MM" (e.g., "17:00")
}

/**
 * Doctor weekly schedule
 */
export type WeeklySchedule = Partial<Record<DayOfWeek, WorkingHours>>;

/**
 * Doctor entity
 */
export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  email: string;
  phone: string;
  workingHours: WeeklySchedule;
}

/**
 * Patient entity
 */
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;  // ISO date string
}

/**
 * Appointment entity
 */
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  startTime: string;     // ISO datetime string
  endTime: string;       // ISO datetime string
  notes?: string;
  status: AppointmentStatus;
}

/**
 * Appointment status
 */
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

/**
 * View mode for the calendar
 */
export type CalendarView = 'day' | 'week';

/**
 * Time slot for calendar rendering
 * Useful for creating calendar grid
 */
export interface TimeSlot {
  start: Date;
  end: Date;
  label: string;  // Human-readable time (e.g., "9:00 AM")
}

/**
 * Appointment with populated patient and doctor data
 * Useful for display purposes
 */
export interface PopulatedAppointment extends Appointment {
  patient: Patient;
  doctor: Doctor;
}

/**
 * Filter options for appointments
 */
export interface AppointmentFilters {
  doctorId?: string;
  date?: Date;
  startDate?: Date;  // For week view
  endDate?: Date;    // For week view
  type?: AppointmentType;
  status?: AppointmentStatus;
}

/**
 * Calendar configuration
 */
export interface CalendarConfig {
  startHour: number;      // Start hour (e.g., 8 for 8 AM)
  endHour: number;        // End hour (e.g., 18 for 6 PM)
  slotDuration: number;   // Duration in minutes (e.g., 30)
}

/**
 * Default calendar configuration
 */
export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  startHour: 8,     // 8 AM
  endHour: 18,      // 6 PM
  slotDuration: 30, // 30 minutes
};

/**
 * Appointment type metadata (for display)
 */
export interface AppointmentTypeInfo {
  type: AppointmentType;
  label: string;
  color: string;          // Hex color code
  defaultDuration: number; // Duration in minutes
}

/**
 * Appointment type display configuration
 */
export const APPOINTMENT_TYPE_CONFIG: Record<AppointmentType, AppointmentTypeInfo> = {
  'checkup': {
    type: 'checkup',
    label: 'General Checkup',
    color: '#3b82f6', // Blue
    defaultDuration: 30,
  },
  'consultation': {
    type: 'consultation',
    label: 'Consultation',
    color: '#10b981', // Green
    defaultDuration: 60,
  },
  'follow-up': {
    type: 'follow-up',
    label: 'Follow-up',
    color: '#f59e0b', // Orange
    defaultDuration: 30,
  },
  'procedure': {
    type: 'procedure',
    label: 'Procedure',
    color: '#8b5cf6', // Purple
    defaultDuration: 90,
  },
};
