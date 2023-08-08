// Sample in-memory database for appointments
const appointments = [];

// Time window in minutes to avoid overlapping appointments
const TIME_WINDOW = 30;

// Create an appointment
export function createAppointment(clinicAvailable, userAvailable, name, date, time) {
  const startTime = new Date(`${date} ${time}`).getTime();
  const endTime = startTime + TIME_WINDOW * 60 * 1000; // Convert minutes to milliseconds

  // Check if the selected date and time slot is available for both clinic and user
  if (!isSlotAvailable(date, time) || !clinicAvailable || !userAvailable) {
    throw new Error('The selected time slot is not available.');
  }

  // Check if the selected time slot overlaps with any existing appointment
  if (appointments.some(appointment => isOverlapping(startTime, endTime, appointment))) {
    throw new Error('The selected time slot overlaps with an existing appointment.');
  }

  const appointment = { name, date, time };
  appointments.push(appointment);
  return appointment;
}

// Get all appointments
export function getAllAppointments() {
  return appointments;
}

// Check if a specific time slot overlaps with an existing appointment
function isOverlapping(startTime, endTime, existingAppointment) {
  const existingStartTime = new Date(`${existingAppointment.date} ${existingAppointment.time}`).getTime();
  const existingEndTime = existingStartTime + TIME_WINDOW * 60 * 1000;

  return (startTime >= existingStartTime && startTime < existingEndTime) ||
    (endTime > existingStartTime && endTime <= existingEndTime) ||
    (startTime <= existingStartTime && endTime >= existingEndTime);
}

// Check if a specific date and time slot is available
export function isSlotAvailable(date, time) {
  return appointments.every(appointment => {
    return !(appointment.date === date && appointment.time === time);
  });
}
