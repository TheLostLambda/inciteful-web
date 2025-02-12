<template>
  <div class="shadow-box">
    <table class="base-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th v-for="(column, index) in columns" :key="index">
            <button
              @click="sortBy(column.name)"
              :class="{ 'font-bold': column.name == sortedBy }"
              class="uppercase"
            >
              {{ column.displayName }}
              <ChevronDownIcon
                v-if="column.name == sortedBy && sortDescending"
                class="w-4 h-4 inline"
              />
              <ChevronUpIcon
                v-if="column.name == sortedBy && !sortDescending"
                class="w-4 h-4 inline"
              />
            </button>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(p, index) in pagedResults"
          :key="index"
          :class="rowClass(index, p.isLocked)"
          @mouseover="$emit('mouseoverRow', p[idColName])"
          @mouseleave="$emit('mouseleaveRow', p[idColName])"
        >
          <td>
            <LitReviewButton :id="p[idColName]" />
          </td>
          <td class="text-left">
            <paper-modal-button
              :id="p.id"
              :text="p.title"
              class="underline block font-semibold text-left"
              :contextIds="this.papers.map(x => x.id)"
            />
            <div v-if="p.author" class="font-semibold text-gray-500">
              <Authors :authors="p.author" />
            </div>
            <span>
              <i>{{ p.journal }}</i
              >{{ p.published_year && p.journal ? ',' : '' }}
              {{ p.published_year ? `${p.published_year}` : '' }}
            </span>
          </td>

          <td
            v-for="(column, index) in columns"
            :key="index"
            class="
              whitespace-nowrap
            "
          >
            {{ p[column.name] }}
          </td>
          <td class="text-purple-600 px-2">
            <button
              v-on:click="$emit('lockPaper', p.id)"
              class="underline block font-semibold pb-2 text-left graph-lock"
              :title="
                p.isLocked
                  ? 'Unlock the graph from this paper'
                  : 'Lock the graph to this paper'
              "
            >
              <LockClosedIcon v-if="p.isLocked" class="w-6 h-6" />
              <LockOpenIcon v-if="!p.isLocked" class="w-6 h-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex text-sm border-t border-gray-200">
      <div class="flex-auto"></div>
      <div v-if="numPages > 1" class="flex-none whitespace-nowrap paging">
        <paginate
          v-model="currentPage"
          :pages="numPages"
          active-color="rgba(139, 92, 246)"
          :hideFirstButton="true"
          :hideLastButton="true"
          @update:modelValue="turnPage"
        >
        </paginate>
      </div>
      <div class="flex-auto text-right">
        <save-drop-down :ids="ids" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
// @ts-ignore
import Paginate from '@hennge/vue3-pagination'
import Authors from './Authors.vue'
import LitReviewButton from './LitReviewButton.vue'
import { Paper, PaperID } from '@/types/incitefulTypes'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  LockClosedIcon,
  LockOpenIcon
} from '@heroicons/vue/outline'
import SaveDropDown from './SaveDropDown.vue'
import PaperModalButton from './Modals/PaperModalButton.vue'

export default defineComponent({
  name: 'ConnectorTable',
  components: {
    Paginate,
    Authors,
    LitReviewButton,
    ChevronDownIcon,
    ChevronUpIcon,
    LockClosedIcon,
    LockOpenIcon,
    SaveDropDown,
    PaperModalButton
  },
  props: {
    papers: {} as PropType<Paper[]>,
    pageSize: {
      type: Number,
      default: 10
    },
    idColName: {
      type: String,
      default: 'id'
    }
  },
  watch: {
    papers (newVal, oldVal) {
      if (newVal !== oldVal) this.currentPage = 1
    }
  },
  emits: ['mouseoverRow', 'mouseleaveRow', 'lockPaper'],
  data () {
    return {
      currentPage: 1,
      sortedBy: '' as string,
      sortDescending: undefined as boolean | undefined,
      columns: [
        { name: 'path_count', displayName: 'Paths' },
        { name: 'distance', displayName: 'Distance' },
        { name: 'num_cited_by', displayName: 'Citations' }
      ]
    }
  },
  computed: {
    numPages (): number {
      if (this.papers) {
        return Math.ceil(this.papers.length / this.pageSize)
      } else {
        return 0
      }
    },
    sortedResults (): Paper[] {
      const sorted = [...(this.papers ?? [])]
      if (this.sortedBy && this.papers && this.papers.length > 0) {
        sorted.sort((a, b) => {
          if (this.sortDescending) {
            return (b as any)[this.sortedBy] - (a as any)[this.sortedBy]
          } else {
            return (a as any)[this.sortedBy] - (b as any)[this.sortedBy]
          }
        })
      }

      sorted.sort((a, b) => {
        return (b as any).isLocked - (a as any).isLocked
      })
      return sorted
    },
    pagedResults (): Paper[] {
      if (this.sortedResults) {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return this.sortedResults.slice(start, end)
      } else return []
    },
    ids (): PaperID[] {
      if (this.papers) return this.papers.map(x => x.id)
      else return []
    }
  },
  methods: {
    rowClass (index: number, isLocked: boolean): Record<string, boolean> {
      return {
        'bg-white': index % 2 === 0 && !isLocked,
        'bg-gray-50': index % 2 !== 0 && !isLocked,
        'border-2': isLocked,
        'border-purple-300': isLocked,
        'bg-purple-100': isLocked
      }
    },
    turnPage (pageNum: number): void {
      this.currentPage = pageNum
    },
    sortBy (column: string): void {
      if ((this.sortedBy = column)) {
        this.sortDescending = !this.sortDescending
      } else {
        this.sortedBy = column
      }
      this.currentPage = 1
    }
  }
})
</script>
