<script setup>
defineProps({
  text: {
    type: String,
    default: null,
  },
  icon: {
    type: Function,
  },
  action: {
    type: Function,
  },
  tooltip: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <button 
    class="btn" 
    @click="action" 
    :class="{ 'btn--icon-only': !text }"
    :title="tooltip" 
  >
    <span 
      v-if="icon" 
      class="btn-icon"
    >
      <component :is="icon" size="16"/>
    </span>
    <span v-if="text" class="btn-text">
      {{ text }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: var(--btn-color);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all .2s ease-in;

  &--outline {
    background: none;
    outline: 1px solid black;
    color: black;

    &:hover {
      background: var(--bg-main) !important;
    }
  }

  &--icon-only {
    background-color: transparent;
    padding: 4px;
    width: 12px;
    height: 12px;
    justify-content: center;
  }
}

.btn:hover {
  background-color: #3f7649;
}

.btn-default {
  border-radius: 4px;
}

.btn-icon {
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
}

.btn--icon-only .btn-icon {
  margin-right: 0;
  color: lightgrey;
}

.btn-text {
  display: inline-flex;
  align-items: center;
}

.btn--icon-only {
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  justify-content: center;

  &:hover {
    background:#efefef;
  }
}
</style>

