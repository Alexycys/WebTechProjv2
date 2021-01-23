import TagNote from '../entities/TagNote.js'

//To do - validations

async function getTagNote() {
    return await TagNote.findAll()
}

async function getTagNoteById(id) {
    return await TagNote.findByPk(id);
}

export { getTagNote, getTagNoteById }
