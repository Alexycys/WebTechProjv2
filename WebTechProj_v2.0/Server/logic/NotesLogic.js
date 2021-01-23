import Notes from '../entities/Notes.js'

//To do - validations

async function createNote(note) {
    return await Notes.create(note)
}

async function getNote() {
    return await Notes.findAll()
}

async function getNoteById(id) {
    return await Notes.findAll({
        where:{
            NoteId: parseInt(id)
        },
        include:[
            {
                model: Attachments, as: "Attachments"
            }
        ]
    });
}

async function updateNote(id, newNote) {
    if (parseInt(id) !== newNote.NoteId) {
        console.log("Entity id different");
        return;
    }

    let updateEntity = await getNoteById(id);

    if (!updateEntity) {
        console.log("There isn't a user with this id");
        return;
    }

    return await updateEntity.update(newNote);
}

async function deleteNote(id) {
    let deleteEntity = await getNoteById(id);

    if (!deleteEntity) {
        console.log("There isn't a note with this id");
        return;
    }

    return await deleteEntity.destroy();
}

export { createNote, getNote, getNoteById, updateNote, deleteNote }