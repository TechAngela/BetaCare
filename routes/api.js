import express from 'express';
import { validationResult, check } from 'express-validator';
import { createAppointment, getAllAppointments } from '../modules/appointments.js';

const router = express.Router();

// Validation rules for appointment creation
const validateAppointmentRequest = [
  check('name').notEmpty().withMessage('Name is required.'),
  check('date').notEmpty().withMessage('Date is required.'),
  check('time').notEmpty().withMessage('Time is required.'),
  check('clinicAvailable').isBoolean().withMessage('clinicAvailable must be a boolean.'),
  check('userAvailable').isBoolean().withMessage('userAvailable must be a boolean.'),
];

// Create an appointment
router.post('/appointments', validateAppointmentRequest, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, date, time, clinicAvailable, userAvailable } = req.body;

  try {
    const appointment = createAppointment(clinicAvailable, userAvailable, name, date, time);
    return res.status(201).json(appointment);
  } catch (error) {
    let status = 409;
    let message = 'Conflict: ';
    
    if (error.message.includes('overlap')) {
      message += 'The selected time slot overlaps with an existing appointment.';
    } else if (error.message.includes('available')) {
      message += 'The selected time slot is not available.';
    } else {
      status = 500;
      message += 'An internal error occurred.';
    }

    return res.status(status).json({ message });
  }
});

// Get all appointments
router.get('/appointments', (req, res) => {
  const appointments = getAllAppointments();
  return res.status(200).json(appointments);
});

export default router;
