import express from "express";
import { getItem, createItem, updateItem, deleteItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.use(protect);
router.get('/name/:tripName', getItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
