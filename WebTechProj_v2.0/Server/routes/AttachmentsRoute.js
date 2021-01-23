import express from 'express'
import { createAttachment, getAttachment, getAttachmentById, updateAttachment, deleteAttachment } from '../logic/AttachmentsLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/attachment').post(async (req, res) => {
  res.json(await createAttachment(req.body));
})

router.route('/allattachment').get(async (req, res) => {
  res.json(await getAttachment());
})

router.route('/attachment/:id').get(async (req, res) => {
  res.json(await getAttachmentById(req.params.id));
})

router.route('/attachment/:id').put(async (req, res) => {
  res.json(await updateAttachment(req.params.id, req.body));
})

router.route('/attachment/:id').delete(async (req, res) => {
  res.json(await deleteAttachment(req.params.id));
})

export default router;