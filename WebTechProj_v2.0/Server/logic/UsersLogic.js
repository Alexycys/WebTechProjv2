import Users from '../entities/Users.js'

//To do - validations

async function createUser(user) {
  return await Users.create(user)
}

async function getUser() {
  return await Users.findAll()
}

async function getUserById(id) {
  return await Users.findByPk(id);
}

async function getUserByName(name){
  return await Users.findAll({
    where: {
      UserNickname : name
    }
  })
}

async function updateUser(id, newName) {
  if (parseInt(id) !== newName.UserId) {
    console.log("Entity id diff");
    return;
  }

  let updateEntity = await getUserById(id);

  if (!updateEntity) {
    console.log("There isn't a user with this id");
    return;
  }

  return await updateEntity.update(newName);

}

async function deleteUser(id) {
  let deleteEntity = await getUserById(id);

  if (!deleteEntity) {
    console.log("There isn't a magazin with this id");
    return;
  }

  return await deleteEntity.destroy();
}

export { createUser, getUser, getUserById, getUserByName, updateUser, deleteUser }