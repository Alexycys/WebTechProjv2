import Users from './entities/Users.js';
import Subjects from './entities/Subjects.js';
import Notes from './entities/Notes.js';
import Attachments from './entities/Attachments.js';
import Tags from './entities/Tags.js';
import TagNote from './entities/TagNote.js';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './dbConfig.js';

import userRouter from './routes/UsersRoute.js'
import attachmentRouter from './routes/AttachmentsRoute.js'
import noteRouter from './routes/NotesRoute.js'
import subjectRouter from './routes/SubjectsRoute.js'
import tagRouter from './routes/TagsRoute.js'
import tagnoteRouter from './routes/TagNoteRoute.js'

let app = express();
let router = express.Router();

app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
app.use(cors());
app.use('/api', router);
app.use('/api', userRouter);
app.use('/api', attachmentRouter);
app.use('/api', noteRouter);
app.use('/api', subjectRouter);
app.use('/api', tagRouter);
app.use('/api', tagnoteRouter);

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let port = process.env.PORT || 8000;
app.listen(port);
console.log('API is runnning at ' + port);

//----------------------------------------------------------------------------------------------

  //users-notes, relatie 1 - M
Users.hasMany(Notes, {as: "Notes", foreignKey: "UserId"});
Notes.belongsTo(Users, {foreignKey: "UserId"}); 

//subjects- notes, relatie 1- M
Subjects.hasMany(Notes, {as: "Notes", foreignKey: "SubjectId"});
Notes.belongsTo(Subjects, {as:"Subjects", foreignKey: "SubjectId"}); 

//notes- attachments, relatie 1 - M
Notes.hasMany(Attachments, {as: "Attachments", foreignKey: "NoteId"});
Attachments.belongsTo(Notes, {foreignKey: "NoteId"}); 

//notes-tags, relatie M - M
Tags.belongsToMany(Notes, {through: "TagNote", as: "Notes", foreignKey: "TagId"});
Notes.belongsToMany(Tags, {through: "TagNote", as: "Tags", foreignKey: "NoteId"});

//----------------------------------------------------------------------------------------------


//get notes and attachments from the subject selected
async function getNotesAttachFromSubject(id){
  return await Notes.findAll({
    where:{
      SubjectId: parseInt(id)
    },
    include:[
      {
        model: Attachments, as: "Attachments"
      }
    ]
  })
}

router.route('/helpsubject/:id').get( async (req, res) => {
  res.json(await getNotesAttachFromSubject(req.params.id));
})

//get all notes and attachments from a certain user

async function getNotesAttachFromUser(id){
  return await Notes.findAll({
    where:{
      UserId: parseInt(id)
    },
    include:[
      {
        model: Attachments, as: "Attachments"
      }
    ]
  })
}

router.route('/helpuser/notes/:id').get( async (req, res) => {
  res.json(await getNotesAttachFromUser(req.params.id));
})


//get notes for a certain tag

async function getNotesFromTag(tag){

  let myTag=await Tags.findOne({
    where:{
      TagContent: tag
    }
  })

  //array with notes id
  let notesId=await TagNote.findAll({
    where:{
      TagId: myTag.TagId
    }
  })


  let notes=[]
  for(let i=0;i<notesId.length;i++)
  {
    notes[i]=await Notes.findByPk(notesId[i].NoteId)
  }

  return notes

}

router.route('/tag/notes/:tagContent').get( async (req, res) => {
  res.json(await getNotesFromTag(req.params.tagContent));
})



//Alex's changes
async function addTagForNoteAlex(noteId, tagName){

  let myTag=await Tags.findOne({
    where:{
      TagContent: tagName
    },
    attributes:['TagId']
  })

  //console.log(myTag);

  if(myTag){
    //console.log("myTag may not be empty?");
     await TagNote.create(
       {
         TagId: myTag.TagId,
         NoteId: parseInt(noteId)
       }
     )
  }
  else{
    console.log("I got here");
     let myNewTag = await Tags.create(
       {
         TagContent: tagName
       }
     )

     await TagNote.create(
       {
         TagId: myNewTag.TagId,
         NoteId: parseInt(noteId)
       }
     )

  }

}

router.route('/notetag/:noteId/:tagContent').post( async (req, res) => {
  res.json(await addTagForNoteAlex(req.params.noteId, req.params.tagContent));
})

//ADD TAG FOR A NOTE

// async function addTagForNote(id, tag)
// {
 
//   //check if tag exists in Tags
//   let myTag=await Tags.findOne({
//     where:{
//       TagContent: tag
//     }
//   })
 
// let createTagNote;
// //if tag exists in Tags
// if(myTag!==null){
// //check if tag exists for my note
// let tagNote=await TagNote.findOne({
//   where:{
//     TagId: myTag.TagId,
//     NoteId: parseInt(id)
//   }
// })

// //if tagNote exists
//   if(tagNote!==null)
//   {
//     //do not create same TagNote twice
//     //+ give a message to user
//     return
//   }
//   else{
//       createTagNote=await TagNote.create({
//       TagId: myTag.TagId,
//       NoteId: parseInt(id)
//     })
//   }
// }


// else{
//   let tagCreated=await Tags.create({
//     TagContent: tag
//   })


//     createTagNote=await TagNote.create({
//     TagId: tagCreated.TagId,
//     NoteId: parseInt(id)
//   })
// }
// return createTagNote
// }


// router.route('/note/:id').post( async (req, res) => {
//   res.json(await addTagForNote(req.params.id, "#economie"));
// })
