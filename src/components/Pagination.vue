<script setup>
import { computed, watch } from 'vue';
import Button from './Button.vue';
import { ChevronFirst, ChevronLast } from 'lucide-vue-next';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  onPageChange: {
    type: Function,
    required: true,
  },
});

const currentPage = computed(() => {
  return props.currentPage > 0 ? props.currentPage : 1;
});

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    props.onPageChange(page);
  }
};

const pageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }
  return pages;
});

watch(() => props.totalPages, (newTotalPages) => {
  if (newTotalPages > 1 && !props.currentPage) {
    props.onPageChange(1);
  }
});
</script>

<template>
  <div class="pagination" :style="{ visibility: totalPages > 1 ? 'visible' : 'hidden' }">
    <Button
      :disabled="currentPage === 1"
      :action="() => goToPage(1)"
      :icon="ChevronFirst"
      class="pagination-button pagination-button-first"
    />
    <Button
      v-for="page in pageNumbers"
      :key="page"
      :action="() => goToPage(page)"
      :text="String(page)"
      :class="{ active: currentPage === page }"
      class="pagination-button"
    />
    <Button
      :disabled="currentPage === totalPages"
      :action="() => goToPage(totalPages)"
      :icon="ChevronLast"
      class="pagination-button pagination-button-last"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: 16px;
  display: flex;
  align-items: center;
  outline: 1px solid lightgrey;
  border-radius: 4px;
}

.pagination-button:disabled {
  pointer-events: none;
  cursor: not-allowed;
}

.pagination-button {
  height: 32px;
  width: 32px;
  padding: 8px 12px;
  border-radius: 0;
  background-color: #fff;
  color: var(--btn-color);
  outline: 1px solid lightgrey;
  cursor: pointer;

  &-first {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &-last {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}

.pagination-button:hover {
  background-color: #3f7649;
  color: #fff;
}

.pagination-button.active {
  background-color: var(--btn-color);
  color: #fff;
}
</style>
