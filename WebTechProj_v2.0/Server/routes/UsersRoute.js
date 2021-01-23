import express from 'express'
import { createUser, getUser, getUserById, updateUser, deleteUser, getUserByName } from '../logic/UsersLogic.js'

const router = express.Router();

//To do: create status try and catch

router.route('/user').post(async (req, res) => {
  res.json(await createUser(req.body));
})

router.route('/alluser').get(async (req, res) => {
    try {
      res.status(200).json(await getUser());
  } catch (e) {
      res.status(500).json({ hasErrors: true, message: e.message })
  }
  //res.json(await getUser());
})

router.route('/user/:id').get(async (req, res) => {
  res.json(await getUserById(req.params.id));
})

router.route('/username/:name').get(async (req, res) => {
  res.json(await getUserByName(req.params.name));
})

router.route('/user/:id').put(async (req, res) => {
  res.json(await updateUser(req.params.id, req.body));
})

router.route('/user/:id').delete(async (req, res) => {
  res.json(await deleteUser(req.params.id));
})

export default router;