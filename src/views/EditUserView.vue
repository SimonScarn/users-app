<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import Button from '../components/Button.vue';
import { Camera } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const firstName = ref('');
const lastName = ref('');
const avatarPreview = ref('');
const fileInput = ref(null);

const userId = ref(route.params.id);

const loadUserData = async () => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const user = users.find((user) => Number(user.id) === Number(userId.value));
        if (user) {
            firstName.value = user.first_name;
            lastName.value = user.last_name;
            avatarPreview.value = user.avatar;
        } else {
            router.push('/users');
        }
    } else {
        router.push('/users');
    }
};

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
    fileInput.value.click();
};

const updateUser = async () => {
    if (!firstName.value || !lastName.value) {
        alert('All fields are required');
        return;
    }

    try {
        await userStore.updateUser({
            id: Number(userId.value),
            first_name: firstName.value,
            last_name: lastName.value,
            avatar: avatarPreview.value,
        });

        alert('User updated successfully');
        router.push('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        alert('An error occurred while updating the user');
    }
};

const deleteUser = async () => {
    try {
        const confirmDelete = confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
            await userStore.deleteUserById(Number(userId.value));
            alert('User deleted successfully');
            router.push('/users');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('An error occurred while deleting the user');
    }
};

onMounted(() => {
    loadUserData();
});

watch(
    () => route.params.id,
    (newUserId) => {
        userId.value = newUserId;
        loadUserData();
    }
);
</script>

<template>
    <div class="edit-user">
        <div class="container">
            <h1>Edit user</h1>
            <div class="edit-user-info">
                <div class="edit-user-info--left shadow">
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
                    <div class="edit-user-info-actions">
                        <Button class="btn-update btn-default" @click="updateUser" text="Update Details"></Button>
                        <Button
                            class="btn-delete btn-default"
                            @click="deleteUser"
                            text="Delete User"
                        ></Button>
                    </div>
                </div>
                <div class="edit-user-info--right shadow">
                    <div class="form-field form-field--centered">
                        <div class="avatar-preview">
                            <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar Preview" class="avatar" />
                        </div>
                        <input type="file" ref="fileInput" style="display: none" @change="handleAvatarChange" />
                        <Button class="btn-photo btn--outline btn-default" @click="triggerFileInput" :icon="Camera"
                            text="Change Photo"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.edit-user {
    margin: 16px auto;

    @media (max-width: 992px) {
        width: 96%;
    }

    &-info {
        display: flex;
        width: 100%;

        @media(max-width: 767px) {
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

            @media(max-width: 767px) {
                margin-left: 0;
            }
        }
        &-actions {
            display: flex;
            align-items: center;
            justify-content: space-between
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

.btn-update {
    width: max-content;
}

.btn-photo {
    width: 100%;
    margin-top: 64px;
}

.btn-delete {
    background-color: red;
    color: white;
    &:hover {
        background-color: #c81d1d;
    }
}
</style>
