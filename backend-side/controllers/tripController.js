import Trip from '../models/Trip.js';

export const getTrips = async (req, res) => {
    const trips = await Trip.find({ user: req.user.id, isDeleted: false })
    res.json(trips)
};

export const createTrip = async (req, res) => {
    const { destination } = req.body;
    const trip = await Trip.create({ user: req.user.id, destination })
    res.status(201).json(trip)
};

export const deleteTrip = async (req, res) => {
    await Trip.findByIdAndUpdate(req.params.id, { isDeleted: true })
    res.json({ message: 'Trip deleted' })
};


