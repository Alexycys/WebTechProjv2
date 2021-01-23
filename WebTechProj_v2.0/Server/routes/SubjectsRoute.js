import express from 'express'
import { createSubject, getSubject, getSubjectById, updateSubject, deleteSubject } from '../logic/SubjectsLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/subject').post(async (req, res) => {
  res.json(await createSubject(req.body));
})

router.route('/allsubject').get(async (req, res) => {
  res.json(await getSubject());
})

router.route('/subject/:id').get(async (req, res) => {
  res.json(await getSubjectById(req.params.id));
})

router.route('/subject/:id').put(async (req, res) => {
  res.json(await updateSubject(req.params.id, req.body));
})

router.route('/subject/:id').delete(async (req, res) => {
  res.json(await deleteSubject(req.params.id));
})

export default router;