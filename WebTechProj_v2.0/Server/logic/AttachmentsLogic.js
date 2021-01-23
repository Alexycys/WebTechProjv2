import Attachments from '../entities/Attachments.js'

//To do - validations

async function createAttachment(attachment) {
  return await Attachments.create(attachment)
}

async function getAttachment() {
  return await Attachments.findAll()
}

async function getAttachmentById(id) {
  return await Attachments.findByPk(id);
}

async function updateAttachment(id, newAttach) {
  if (parseInt(id) !== newAttach.AttachmentId) {
    console.log("Entity id diff");
    return;
  }

  let updateEntity = await getAttachmentById(id);

  if (!updateEntity) {
    console.log("There isn't a user with this id");
    return;
  }

  return await updateEntity.update(newAttach);
}

async function deleteAttachment(id) {
  let deleteEntity = await getAttachmentById(id);

  if (!deleteEntity) {
    console.log("There isn't a attach with this id");
    return;
  }

  return await deleteEntity.destroy();
}

export { createAttachment, getAttachment, getAttachmentById, updateAttachment, deleteAttachment }