<template>
  <button
    v-on:click="showModal(author)"
    :title="author.affiliation"
    class="hover:underline"
  >
    {{ author.name }}
    <span v-if="showAffiliation">({{ author.affiliation }})</span>
  </button>
</template>

<script lang="ts">
import { Author, PaperID } from '@/types/incitefulTypes'
import { AuthorModalOptions } from '@/types/modalTypes'
import { showModalHelper } from '@/utils/emitHelpers'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Author',
  props: {
    showAffiliation: { type: Boolean, default: false },
    author: {} as PropType<Author>,
    ids: {} as PropType<Array<PaperID>>
  },
  methods: {
    showModal (author: Author) {
      const options: AuthorModalOptions = {
        author,
        contextIds: this.ids
      }
      showModalHelper(options)
    }
  }
})
</script>
