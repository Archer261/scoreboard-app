import express from 'express';
import {
    createMatch,
    deleteMatch,
    getAllMatch,
    getMatch,
    updateMatch
} from '../controllers/match.js';
import { verifyAdmin, verifyModerator } from '../utils/verifyToken.js';

const router = express.Router();

// Create Match
router.post('/', createMatch);

// Update Match
router.put('/:id', verifyModerator, updateMatch)

// Delete Match
router.delete('/:id', verifyModerator, verifyAdmin, deleteMatch)

// Get Match
router.get('/:id', getMatch)

//Get all Matches
router.get('/', getAllMatch)

export default router;