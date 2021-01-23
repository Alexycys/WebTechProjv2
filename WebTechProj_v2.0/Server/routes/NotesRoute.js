import express from 'express'
import { createNote, getNote, getNoteById, updateNote, deleteNote } from '../logic/NotesLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/note').post(async (req, res) => {
    res.json(await createNote(req.body));
})

router.route('/allnote').get(async (req, res) => {
    res.json(await getNote());
})

router.route('/note/:id').get(async (req, res) => {
    res.json(await getNoteById(req.params.id));
})

router.route('/note/:id').put(async (req, res) => {
    res.json(await updateNote(req.params.id, req.body));
})

router.route('/note/:id').delete(async (req, res) => {
    res.json(await deleteNote(req.params.id));
})

export default router;