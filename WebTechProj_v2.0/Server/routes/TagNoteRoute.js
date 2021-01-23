import express from 'express'
import { getTagNote, getTagNoteById } from '../logic/TagNoteLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/tagnote/:id').get(async (req, res) => {
    res.json(await getTagNoteById(req.params.id));
})

router.route('/alltagnote').get(async (req, res) => {
    res.json(await getTagNote());
})

export default router;