import express from 'express';
import { getTrips, createTrip, deleteTrip } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getTrips);
router.post('/', createTrip);
router.delete('/:id', deleteTrip);

export default router;