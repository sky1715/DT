const { ObjectId } = require('mongodb');
const { getDB } = require('../config/db');

// Get event by ID
const getEventById = async (req, res) => {
    const db = getDB();
    const eventId = req.query.id;

    try {
        const event = await db.collection('events').findOne({ _id: new ObjectId(eventId) });
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event', error: err.message });
    }
};

// Get events with pagination
const getEvents = async (req, res) => {
    const db = getDB();
    const { type, limit = 5, page = 1 } = req.query;

    try {
        const events = await db.collection('events')
            .find(type === 'latest' ? {} : {})
            .sort({ _id: -1 })
            .skip((page - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .toArray();

        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
};

// Create an event
const createEvent = async (req, res) => {
    const db = getDB();
    const eventData = req.body;

    try {
        const result = await db.collection('events').insertOne(eventData);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    const db = getDB();
    const eventId = req.params.id;
    const updatedData = req.body;

    try {
        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(eventId) },
            { $set: updatedData }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Event updated' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const db = getDB();
    const eventId = req.params.id;

    try {
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
};

module.exports = { getEventById, getEvents, createEvent, updateEvent, deleteEvent };
