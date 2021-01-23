import Subjects from '../entities/Subjects.js'

//To do - validations

async function createSubject(subject) {
    return await Subjects.create(subject)
}

async function getSubject() {
    return await Subjects.findAll()
}

async function getSubjectById(id) {
    return await Subjects.findByPk(id);
}

async function updateSubject(id, newSubject) {
    if (parseInt(id) !== newSubject.SubjectId) {
        console.log("Entity id is different");
        return;
    }

    let updateEntity = await getSubjectById(id);

    if (!updateEntity) {
        console.log("There isn't a user with this id");
        return;
    }

    return await updateEntity.update(newSubject);
}

async function deleteSubject(id) {
    let deleteEntity = await getSubjectById(id);

    if (!deleteEntity) {
        console.log("There isn't a subject with this id");
        return;
    }

    return await deleteEntity.destroy();
}

export { createSubject, getSubject, getSubjectById, updateSubject, deleteSubject }