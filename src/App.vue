<script setup>
import { ref, computed } from "vue";
import { IconCirclePlus } from "@tabler/icons-vue";
import { userNoteStore } from "./stores/NotesStore";
import dayjs from "dayjs";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import Notes from "./components/Notes.vue";

const isOpen = ref(false);
const NotesStore = userNoteStore();

const closeModal = () => {
  isOpen.value = false;
  newNote.value = '';
  isNoteEmpty.value = false;
};

const openModal = () => {
  isOpen.value = true;
};

const saveNotes = () => {
  if (newNote.value.trim() !== '') {
    const note = {
      id: Date.now(),
      title: newNote.value,
      isFave: addToFave.value,
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    NotesStore.addNote(note);
    closeModal();
    addToFave.value = false;
  } else {
    isNoteEmpty.value = true;
  }
};

const faveNotes = computed(() => {
  return NotesStore.Notes.filter((note) => note.isFave);
});

const favecount = computed(() => {
  return NotesStore.Notes.reduce((count, note) => {
    return note.isFave ? count + 1 : count;
  }, 0);
});

const reverseItem = computed(() => {
  return [...NotesStore.Notes].reverse();
});

const filter = ref("All");
const newNote = ref('');
const addToFave = ref(false);
const isNoteEmpty = ref(false);
</script>

<template>
  <header class="flex items-center bg-blue-100 py-4 justify-center space-x-2">
    <div class="w-[50%] flex justify-between items-center">
      <img src="./assets/note.png" alt="Notes Logo" class="h-[50px] w-[50px]" />
      <h1 class="text-3xl font-bold ml-4">Pinia Notes</h1>
      <IconCirclePlus :size="38" @click="openModal" class="cursor-pointer" />
    </div>
  </header>

  <!-- Filter -->
  <nav class="flex justify-center mt-5">
    <button
      type="button"
      class="inline-flex mr-4 justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-black-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="filter = 'All'"
    >
      All Notes
    </button>

    <button
      type="button"
      class="inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-black-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      @click="filter = 'favs'"
    >
      Fav Notes
    </button>
  </nav>

  <div v-if="filter === 'All'">
    <p class="flex items-center justify-center font-bold text-2xl">
      All Notes ({{ NotesStore.Notes.length }})
    </p>
    <ul>
      <div v-for="note in reverseItem" :key="note.id">
        <Notes :Note="note" />
      </div>
    </ul>
  </div>

  <div v-if="filter === 'favs'">
    <p class="flex items-center justify-center font-bold text-2xl">
      Favorite Notes ({{ favecount }})
    </p>
    <ul>
      <div v-for="note in faveNotes" :key="note.id">
        <Notes :Note="note" />
      </div>
    </ul>
  </div>

  <!-- Model HeadlessUI-->

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Write Notes Here
              </DialogTitle>

              <div class="mt-2">
                <textarea
                  v-model="newNote"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  placeholder="Write Here to add Notes ..."
                ></textarea>
                <p v-if="isNoteEmpty" class="text-red-500 mt-2">Note cannot be empty!</p>
              </div>

              <div class="mt-4 space-x-2 flex items-center">
                <input
                  type="checkbox"
                  v-model="addToFave"
                  class="form-checkbox text-blue-500"
                />
                <label class="text-sm text-gray-700">Add to Favorites</label>
              </div>

              <div class="mt-4 space-x-2 flex justify-end">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-black-900 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2"
                  @click="saveNotes"
                >
                  Save
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
