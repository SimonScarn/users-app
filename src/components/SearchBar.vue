<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/userStore'; 
import { Search } from 'lucide-vue-next'; 
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const query = ref(userStore.query);

const updateQuery = () => {
  const lowerCaseQuery = query.value.trim().toLowerCase();
  userStore.setQuery(lowerCaseQuery); 
  setPagination();
};

const setPagination = () => {
  router.replace({
    name: 'users', 
  });
};
</script>

<template>
  <div class="search-bar">
    <input 
      v-model="query" 
      @input="updateQuery" 
      class="search-bar__input" 
      placeholder="Search for users..." 
    />
    <span class="search-bar__icon">
      <Search size="16" color="#808080" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;

  @media (min-width: 768px) {
    min-width: 400px;
  }

  @media (min-width: 480px) {
    min-width: 300px;
    width: 100%;
  }

  @media (max-width: 479px) {
    width: 100%;
  }
}

.search-bar__input {
  width: 100%;
  background-color: var(--bg-main);
  outline-color: transparent;

  &:focus,
  &:active,
  &:hover {
    outline: 1px solid grey;
  }
}

.search-bar__icon {
  position: absolute;
  right: 10px;
  color: #ccc;
}
</style>
