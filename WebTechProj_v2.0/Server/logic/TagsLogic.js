import Tags from '../entities/Tags.js'

//To do - validations

async function createTag(tag) {
    return await Tags.create(tag);
}

async function getTag() {
    return await Tags.findAll();
}

async function getTagById(id) {
    return await Tags.findByPk(id);
}

async function updateTag(id, newTag) {
    if (parseInt(id) !== newTag.TagId) {
        console.log("Entity id different");
        return;
    }

    let updateEntity = await getTagById(id);

    if (!updateEntity) {
        console.log("There isn't a user with this id");
        return;
    }

    return await updateEntity.update(newTag);
}

async function deleteTag(id) {
    let deleteEntity = await getTagById(id);

    if (!deleteEntity) {
        console.log("There isn't a tag with this id");
        return;
    }

    return await deleteEntity.destroy();
}

export { createTag, getTag, getTagById, updateTag, deleteTag }

