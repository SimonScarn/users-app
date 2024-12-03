<script setup>
import Button from './Button.vue';

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['confirm', 'cancel']);

const closeModal = () => {
    emit('cancel');
};
</script>

<template>
    <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
            <h2 class="modal-title">Are you sure you want to delete this user?</h2>
            <p><strong>{{ user?.first_name }} {{ user?.last_name }}</strong></p>
            <div class="modal-actions">
                <Button text="Yes" :action="() => emit('confirm')" tooltip="Confirm Deletion" />
                <Button text="Cancel" :action="() => emit('cancel')" tooltip="Cancel Deletion" class="btn--outline" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    width: 300px;

    &-title {
        margin-bottom: 16px;
        font-size: 20px;
    }
}

.modal-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
}
</style>
