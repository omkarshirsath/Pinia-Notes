<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4"></h2>
      <div class="space-y-4">
        <div class="Note bg-gray-200 p-5 rounded-xl">
          <h3 class="text-lg">{{ Note.title }}</h3>
          <p class="text-sm text-gray-500 mt-2">{{ Note.timestamp }}</p> <!-- Add this line -->
          <div class="icons justify-end flex m-3 p-3">
            <IconTrash
              :size="28"
              class="mr-5 cursor-pointer"
              @click="deleteNote(Note.id)"
            />
            <template v-if="!Note.isFave">
              <IconHeart
                :size="28"
                class="cursor-pointer"
                @click="addToFav(Note.id)"
              />
            </template>
            <template v-else>
              <IconHeartFilled
                :size="28"
                class="cursor-pointer"
                @click="removeFromFav(Note.id)"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { IconTrash, IconHeart, IconHeartFilled } from "@tabler/icons-vue";
import { defineProps } from "vue";
import { ref } from 'vue';
import { userNoteStore } from "../stores/NotesStore";

const props = defineProps(["Note"]);

const NotesStore = userNoteStore();

function deleteNote(noteId) {
  NotesStore.deleteNote(noteId);
}

function addToFav(noteId) {
  NotesStore.addToFav(noteId);
}

function removeFromFav(noteId) {
  NotesStore.removeFromFav(noteId);
}

</script>

<style lang="scss" scoped></style>
