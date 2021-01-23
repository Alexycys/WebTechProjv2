import express from 'express'
import { createTag, getTag, getTagById, updateTag, deleteTag } from '../logic/TagsLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/tag').post(async (req, res) => {
    res.json(await createTag(req.body));
})

router.route('/alltag').get(async (req, res) => {
    res.json(await getTag());
})

router.route('/tag/:id').get(async (req, res) => {
    res.json(await getTagById(req.params.id));
})

router.route('/tag/:id').delete(async (req, res) => {
    res.json(await deleteTag(req.params.id));
})

router.route('/tag/:id').put(async (req, res) => {
    res.json(await updateTag(req.params.id, req.body));
})

export default router;