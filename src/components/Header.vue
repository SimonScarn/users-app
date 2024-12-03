<script setup>
import { ref, watch } from 'vue';
import Button from './Button.vue';
import SearchBar from './SearchBar.vue';
import { Plus } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../store/userStore';

const searchQuery = ref('');
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

watch(searchQuery, (newQuery) => {
  userStore.setQuery(newQuery); 
});

const goToAddUser = () => {
  router.push({ name: 'add-user' });
};
</script>

<template>
  <div class="header">
    <SearchBar v-model="searchQuery" />
    <Button text="Add User" :action="goToAddUser" :icon="Plus" />
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 32px 16px 24px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: auto;
  border-bottom: 1px solid whitesmoke;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    align-items: start;

    .btn {
      width: 100%;
    }
  }
}
</style>