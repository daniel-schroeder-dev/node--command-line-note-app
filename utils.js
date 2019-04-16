// notes will be saved as an array of JSON objects, like so:
// [
//  {
//    "title":"Note Title", 
//    "body":"Note Body"
//  },
//  {
//    "title":"Todo List",
//    "body":"So Much Stuff"
//  }
// ]

const l = console.log
const fs = require('fs')
const dataStorePath = './notes.json'

const create = (title, body) => {
  // load the notes from the filesystem
  const notes = loadNotes()
  // notes must have a unique title, so check for this before allowing creation
  if (isUniqueTitle(notes, title)) {
    // add the note to the notes array
    notes.push({
      title: title,
      body: body
    })
    l('Saving the note')
    saveNotes(notes)
  } else {
    l('Title already taken!')
  }
}

// ############### HELPER FUNCTIONS ##################### //

const loadNotes = () => {
  // if there is no file present at dataStorePath, an error will be thrown. 
  try {
    // notes will be a JSON string
    const notes = fs.readFileSync(dataStorePath, 'utf8')
    return JSON.parse(notes)
  } 
  catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync(dataStorePath, JSON.stringify(notes))
}

const isUniqueTitle = (notes, title) => {
  // if the title exists in the notes array, notes.some() will return true, meaning we have a duplicate title. This method's name leads us to return true if there is NO duplicate title, so we need to reverse the logic.
  return !(notes.some(note => note.title === title))
}



module.exports = {
  create: create
}