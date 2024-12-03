<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import Button from '../components/Button.vue';
import { Camera } from 'lucide-vue-next';

const router = useRouter();
const userStore = useUserStore();

const firstName = ref('');
const lastName = ref('');
const avatarPreview = ref('');

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      avatarPreview.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  const input = document.getElementById('avatar');
  input.click();
};

const addUser = async () => {
  if (!firstName.value || !lastName.value) {
    alert('All fields are required');
    return;
  }

  try {
    const newUser = {
      id: Date.now(),
      first_name: firstName.value,
      last_name: lastName.value,
      avatar: avatarPreview.value,
    };

    await userStore.addUser(newUser);

    alert('User added successfully');
    router.push('/users');
  } catch (error) {
    console.error('Error adding user:', error);
    alert('An error occurred while adding the user');
  }
};
</script>

<template>
  <div class="add-user">
    <div class="container">
      <h1>Add user</h1>
      <div class="add-user-info">
        <div class="add-user-info--left shadow">
          <div class="form">
            <div class="form-field">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" v-model="firstName" placeholder="Enter First Name" />
            </div>
            <div class="form-field">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" v-model="lastName" placeholder="Enter Last Name" />
            </div>
          </div>
          <Button class="btn-save btn-default" @click="addUser" text="Add User"></Button>
        </div>
        <div class="add-user-info--right shadow">
          <div class="form-field form-field--centered">
            <div class="avatar-preview">
              <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar Preview" class="avatar" />
              <input
                v-show="avatarPreview === ''"
                type="file"
                ref="avatarInput"
                id="avatar"
                accept="image/*"
                @change="handleAvatarChange"
                class="avatar-input"
              />
            </div>
            <Button
              class="btn-photo btn--outline btn-default"
              :disabled="!avatarPreview"
              text="Change Photo"
              :icon="Camera"
              @click="triggerFileInput"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-user {
  margin: 16px auto;

  @media (max-width: 992px) {
    width: 96%;
  }

  &-info {
    display: flex;
    width: 100%;

    @media (max-width: 992px) {
      flex-direction: column-reverse;
      gap: 16px;
    }

    &--left,
    &--right {
      flex: 1;
      padding: 64px 16px 32px 16px;
      background: white;
      border-radius: 5px;
    }

    &--left {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: space-between;
      padding-inline: 24px;
    }

    &--right {
      flex: 1;
      margin-left: 24px;

      @media (max-width: 992px) {
        margin-left: 0;
      }
    }
  }
}

.form {
  display: flex;
  gap: 16px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: 1;

  &--centered {
    align-items: center;
    justify-content: center;
  }

  input {
    width: -webkit-fill-available;
  }

  .avatar {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    outline: 2px solid lightgray;
    outline-offset: 2px;
  }
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

.btn-save {
  width: max-content;
}

.btn-photo {
  width: 100%;
  margin-top: 64px;

  &:disabled {
    cursor: not-allowed;
  }
}

.avatar-input {
  display: block;
  height: 115px;
  margin-top: 10px;
}
</style>
