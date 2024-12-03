<script setup>
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '../store/userStore';
import { useRouter } from 'vue-router';
import { Edit, Trash } from 'lucide-vue-next';
import Button from '../components/Button.vue';
import Modal from '../components/Modal.vue';

const userStore = useUserStore();
const router = useRouter();
const selectedUser = ref(null);
const showModal = ref(false);


const editUser = (userId) => {
  router.push({ name: 'edit-user', params: { id: userId } });
};

const deleteUser = (userId) => {
  selectedUser.value = userStore.filteredUsers.find(user => user.id === userId);
  showModal.value = true;
};

const confirmDelete = async () => {
  if (selectedUser.value) {
    await userStore.deleteUserById(selectedUser.value.id);
  }
  showModal.value = false;
};

const cancelDelete = () => {
  showModal.value = false;
};

onMounted(() => {
  userStore.loadUsers();
});
</script>

<template>
  <div class="user-table">
    <div class="user-table-header">
      <div class="avatar-col"></div>
      <div class="name-col">Full Name</div>
      <div class="action-col">Action</div>
    </div>
    <div v-if="userStore.filteredUsers.length === 0" class="no-users">No users found</div>
    <div v-for="user in userStore.getPaginatedUsers()" :key="user.id" class="user-row">
      <div class="avatar-col">
        <img :src="user.avatar" alt="User Avatar" class="avatar" />
      </div>
      <div class="name-col">
        {{ user.first_name }} {{ user.last_name }}
      </div>
      <div class="action-col">
        <div class="user-table__actions">
          <Button :icon="Edit" :action="() => editUser(user.id)" tooltip="Edit User" />
          <Button :icon="Trash" :action="() => deleteUser(user.id)" tooltip="Delete User" />
        </div>
      </div>
    </div>

    <Modal v-if="showModal" 
      :user="selectedUser" 
      :show="showModal" 
      @confirm="confirmDelete" 
      @cancel="cancelDelete" />
  </div>
</template>

<style lang="scss" scoped>
.user-table {
  margin: 24px auto;
  padding: 0 16px;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.user-table-header,
.user-row {
  display: flex;
  padding: 8px;
  align-items: center;
  border-radius: 5px;
}

.user-table-header {
  font-weight: bold;
}

.avatar-col,
.name-col,
.action-col {
  display: flex;
  align-items: center;
}

.avatar-col {
  width: 10%;
  @media (max-width: 767px) {
    width: 20%;
  }
}

.name-col {
  width: 85%;
  @media(max-width: 1399px) {
    width: 80%;
  }
  @media (max-width: 767px) {
    width: 60%;
  }
}

.action-col {
  width: 5%;
  @media(max-width: 1399px) {
    width: 10%;
  }
  @media (max-width: 767px) {
    width: 20%;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-table__actions {
  display: flex;
  justify-content: start;
  margin-left: -12px;
}

.no-users {
  text-align: center;
  margin-top: 20px;
}

.user-table .user-row:nth-child(even) {
  background-color: var(--bg-main);
}
</style>
