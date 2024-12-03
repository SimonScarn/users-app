<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../store/userStore';
import Header from '../components/Header.vue';
import UserTable from '../components/UserTable.vue';
import Pagination from '../components/Pagination.vue';

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const page = ref(1);

const loadPage = async (pageNumber) => {
  page.value = pageNumber;
  await userStore.loadUsers(page.value, false); 
  updateUrl();
};

const updateUrl = () => {
  router.replace({
    name: 'users'
  });
};

const handlePageChange = (page) => {
  userStore.currentPage = page; 
};

onMounted(() => {
  userStore.loadUsers(page.value, true); 
});
</script>

<template>
  <div class="home">
    <div class="container">
      <h1 class="text-left">User list</h1>
      <div class="home-content shadow">
        <Header />
        <UserTable />
      </div>
       <Pagination
      :currentPage="userStore.currentPage"
      :totalPages="userStore.totalPages"
      :onPageChange="handlePageChange"
    />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-content {
  border-radius: 5px;
  background: #fff;
  width: 100%;
}
</style>
