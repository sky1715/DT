const express = require('express');
const {
    getEventById,
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/events', getEventById); // Fetch event by ID
router.get('/events', getEvents); // Fetch events with pagination
router.post('/events', createEvent); // Create an event
router.put('/events/:id', updateEvent); // Update an event
router.delete('/events/:id', deleteEvent); // Delete an event

module.exports = router;
