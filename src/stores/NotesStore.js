import { defineStore } from 'pinia';
import dayjs from 'dayjs';

import { ref } from 'vue';

export const userNoteStore = defineStore('NotesStore', () => {
  const Notes = ref([
    {
      id: 1,
      title: "this omkarsdfadsf asdfasdfasdf asdfasdfasdfdfazsdfasdfasd asdfasdfasdf asdfasdfasdf asdfafasdfa  asdfasdfasdf adsfa fas asdfa sdfasd f asdfadsfasd asdfasdf shirsath",
      isFave: false
    },
    {
      id: 2,
      title: "this another one",
      isFave: true
    },
    {
      id: 3,
      title: "this third shirsath",
      isFave: true
    },
    {
      id: 4,
      title: "this fourth shirsath",
      isFave: false
    }
  ]);

  
  function addNote(note) {
    note.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    Notes.value.push(note); 
  }
  function deleteNote(noteId) {
    const index = Notes.value.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      Notes.value.splice(index, 1);
    }
  }

  function addToFav(noteId) {
    const note = Notes.value.find((note) => note.id === noteId);
    if (note) {
      note.isFave = true;
    }
  }

  function removeFromFav(noteId) {
    const note = Notes.value.find((note) => note.id === noteId);
    if (note) {
      note.isFave = false;
    }
  }

  return {
    Notes,
    addNote,
    deleteNote,
    addToFav,
    removeFromFav
  };
});
